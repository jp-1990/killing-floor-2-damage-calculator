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
    const skills = this.perk.skills;
    const passiveModifiers = this.perk.passiveModifiers;
    const skillModifiers = this.perk.skillModifiers;

    this.weapons.forEach((weapon, index) => {
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
}
