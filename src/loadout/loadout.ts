import { GameType } from "../types";
import { buildPerk, BuildPerkType, applyModifiers } from "../perks";
import { selectWeapons, SelectWeaponsType } from "../weapons";
import { buildZeds } from "../zeds";

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
      const hitzones = (<unknown>(
        Object.keys(zed.hitzones)
      )) as (keyof typeof zed.hitzones)[];

      // build weapon stats for zed
      const weapons = this.weapons.map((weapon) => {
        // build primary damage obj
        const primaryDamage: { [key: string]: number } = {};
        hitzones.forEach((zone) => {
          primaryDamage[zone] = 0;

          // merge primary damage numbers
          let damagePerShot = 0;
          weapon.stats.primaryDamage.forEach((el) => {
            // apply hitzone modifier
            damagePerShot = el.damage;

            damagePerShot *= zed.hitzones[zone];
            // apply resistances

            const damageGroup = el.group as keyof typeof zed.resistances;
            if (zed.resistances[damageGroup] !== undefined) {
              damagePerShot *= zed.resistances[damageGroup];
            }
          });
          Math.round(damagePerShot);

          // if hitzone === head then head, else body
          const health = zone === "head" ? zed.health.head : zed.health.body;
          let damage = 0;
          let counter = 0;
          // loop while damage < health
          while (damage < health) {
            damage += Math.round(damagePerShot);
            counter++;
          }

          primaryDamage[zone] = counter;
        });
        return {
          name: weapon.name,
          upgrade: weapon.upgrade,
          primaryDamage,
        };
      });

      return {
        name: zed,
        weapons,
      };
    });

    return output;
  }
}
