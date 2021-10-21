import { GameType } from "../types";
import { buildPerk, BuildPerkType, applyModifiers } from "../perks";
import { selectWeapons, SelectWeaponsType } from "../weapons";
import { buildZeds } from "../zeds";
import { DamageTypes } from "../weapons/types";

// input ----
// perk
// game
// weapons[]
// zeds[]

// stats ----
// game :{
//  difficulty,
//  players
// }
// perkStats :{
// ...result of select perk
// }
// weapons:{
//   name,
// }[]
// zeds[]

// methods ----
// applyPerkModifiers() // apply perk modifiers to weapons stats
// calcDamagePerSecond() // calculate damage per second for weapons
// calcDamagePerMag() // calculate damage per mag
// calcTotalDamage() // calculate damage for expending all ammo

// calcKillTime() // time to kill each zed (head/body) for each weapon **account for reloads
// calcShotsToKill() // shots to kill each zed (head/body) for each weapon

interface LoadoutInputType {
  game: GameType;
  perk: BuildPerkType;
  weapons: SelectWeaponsType[];
}

export class Loadout {
  game;
  perk;
  weapons;
  zeds;
  shotsToKill;
  constructor({ game, perk, weapons }: LoadoutInputType) {
    this.game = game;
    this.perk = buildPerk(perk);
    this.weapons = selectWeapons(weapons);
    this.zeds = buildZeds(game);
    this.#applyPerkModifiers();
    this.shotsToKill = this.#calcShotsToKill();
  }

  #applyPerkModifiers() {
    const skills = this.perk.skills;
    const passiveModifiers = this.perk.passiveModifiers;
    const skillModifiers = this.perk.skillModifiers;

    this.weapons.forEach((weapon) => {
      // if weapon not in perk weapons, return
      if (!this.perk.perkWeapons.includes(weapon.name)) return;

      applyModifiers({
        skills,
        skillModifiers,
        passiveModifiers,
        name: this.perk.name,
        weaponInput: weapon,
      });
    });
  }

  #calcShotsToKill() {
    // loop over zeds
    const output = this.zeds.map((zed) => {
      // build weapon stats for zed
      const weapons = this.weapons.map((weapon) => {
        const weaponDamage: ["primaryDamage", "secondaryDamage"?] = [
          "primaryDamage",
        ];
        if (weapon.stats.secondaryDamage) weaponDamage.push("secondaryDamage");

        const damage = weaponDamage.map((el) => {
          if (!el) return;
          const shots = zed.hitzones.map((zone) => {
            let bodyDamage = 0;
            let headDamage = 0;
            let counter = 0;
            // loop while damage < health
            while (
              bodyDamage < zed.health.body &&
              headDamage < zed.health.head
            ) {
              const excludeHead = (type: DamageTypes) =>
                [DamageTypes.explosive].includes(type);
              // target zone
              const target = zone.name;
              const modifier = zone.modifier;
              const bodyModifier =
                zed.hitzones.find((el) => el.name === "body")?.modifier || 1;

              weapon.stats[el]?.forEach((e) => {
                let damage = e.damage;
                // apply modifier
                if (target === "head" && excludeHead(e.type)) {
                  damage *= bodyModifier;
                } else {
                  damage *= modifier;
                }
                // apply resistance
                const damageGroup = e.group as keyof typeof zed.resistances;
                if (zed.resistances[damageGroup] !== undefined) {
                  damage *= zed.resistances[damageGroup];
                }
                // if target = head, apply modified damage to head and body health
                if (target === "head" && !excludeHead(e.type))
                  headDamage += damage;

                // if damage type cant hit head, apply to body
                bodyDamage += damage;
              });

              counter++;
            }

            return { [zone.name]: counter };
          });

          return {
            [el]: shots,
          };
        });

        return {
          name: weapon.name,
          upgrade: weapon.upgrade,
          damage,
        };
      });

      return {
        name: zed.name,
        weapons,
      };
    });

    return output;
  }
}
