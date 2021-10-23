import { GameType } from "../types";
import { buildPerk, BuildPerkType, applyModifiers } from "../perks";
import { selectWeapons, SelectWeaponsType } from "../weapons";
import { buildZeds } from "../zeds";
import { traceZones } from "../weapons/utils";
import { shotsToHitzone } from "./utils";
import { FireMode } from "../weapons/types";

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
// calcAmmoToKill() // shots to kill each zed (head/body) for each weapon

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
    this.shotsToKill = this.#calcAmmoToKill();
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

  #calcAmmoToKill() {
    // loop over zeds
    const output = this.zeds.map((zed) => {
      // build weapon stats for zed
      const weapons = this.weapons.map((weapon) => {
        const fireType: ["primaryDamage", "secondaryDamage"?] = [
          "primaryDamage",
        ];
        if (weapon.stats.secondaryDamage) fireType.push("secondaryDamage");

        const ammo = fireType.map((el) => {
          if (!el) return;
          const bodyModifier =
            zed.hitzones.find((el) => el.name === "body")?.modifier || 1;

          const shots = zed.hitzones.map((zone) => {
            return shotsToHitzone<typeof weapon, typeof zed.resistances>({
              zone,
              weapon,
              bodyModifier,
              traceZones,
              health: zed.health,
              resistances: zed.resistances,
              fireType: el,
              fireMode: FireMode.auto,
            });
          });

          return {
            [el]: shots,
          };
        });

        return {
          name: weapon.name,
          upgrade: weapon.upgrade,
          ammo,
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
