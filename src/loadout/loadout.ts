import { GameType } from "../types";
import { buildPerk, BuildPerkType } from "../perks";
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
  // shotsToKill;
  constructor({ game, perk, weapons }: LoadoutInputType) {
    this.game = game;
    this.perk = buildPerk(perk);
    this.weapons = selectWeapons(weapons);
    this.zeds = buildZeds(game);
    this.#applyPerkModifiers();
    // this.shotsToKill = this.calcShotsToKill();
  }

  // apply perk modifiers
  #applyPerkModifiers() {
    // for each weapon
    this.weapons.forEach((weapon, index) => {
      // if weapon not in perk weapons, return
      if (!this.perk.perkWeapons.includes(weapon.name)) return;
      // apply perk modifiers to weapon stats

      // commando specific
      weapon.stats.primaryDamage.forEach((damageType) => {
        if (this.perk.damageTypes.includes(damageType.type)) {
          damageType.damage += Math.ceil(
            damageType.damage * this.perk.passiveModifiers.damage
          );
        }
      });
      weapon.stats.secondaryDamage?.forEach((damageType) => {
        if (this.perk.damageTypes.includes(damageType.type)) {
          damageType.damage += Math.ceil(
            damageType.damage * this.perk.passiveModifiers.damage
          );
        }
      });
      weapon.stats.reload.forEach((damageType) => {
        const normal = damageType.normal;
        normal.dry -= normal.dry * this.perk.passiveModifiers.reload;
        normal.half -= normal.half * this.perk.passiveModifiers.reload;
        if (damageType.elite) {
          const elite = damageType.elite;
          elite.dry -= elite.dry * this.perk.passiveModifiers.reload;
          elite.half -= elite.half * this.perk.passiveModifiers.reload;
        }
      });
    });
    console.log("from function");
  }
}
