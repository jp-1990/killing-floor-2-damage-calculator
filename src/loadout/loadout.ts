import { GameType } from "../types";
import { buildPerk, Commando, PlayerPerk, PerkName } from "../perks";

import { buildZeds } from "../zeds";

import { selectWeapons, WeaponType, WeaponName } from "./utils";

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
//
// }[]
// zeds

// methods ----
// applyPerkModifiers()
// calculateKillTime()

const selectPerk = (perk: PlayerPerk<PerkName>) => {
  return buildPerk(perk);
};

export class Loadout {
  game: GameType;
  playerStats: Commando;
  weapons;
  shotsToKill;
  constructor(
    perk: PlayerPerk<PerkName>,
    weapons: WeaponType<WeaponName>[],
    game: GameType
  ) {
    this.game = game;
    this.playerStats = selectPerk(perk);
    this.weapons = selectWeapons(weapons);
    this.applyPerkBonuses();
    this.shotsToKill = this.calcShotsToKill();
  }

  applyPerkBonuses() {
    this.weapons.forEach((weapon) => {
      weapon.stats.damage +=
        weapon.stats.baseDamage * this.playerStats.stats.damageMultiplier;
    });
  }

  calcShotsToKill() {
    const zedStats = buildZeds(this.game);

    let result = {};
    this.weapons.forEach((weapon) => {
      const output: { [key: string]: { head: number; body: number } } = {};
      Object.keys(zedStats).forEach((el) => {
        const zed = el as keyof typeof zedStats;
        output[zed] = {
          head: Math.ceil(
            zedStats[zed].health.head /
              Math.floor(
                Math.floor(weapon.stats.damage * zedStats[zed].hitzones.head) *
                  zedStats[zed].resistances[weapon.damageGroup]
              )
          ),
          body: Math.ceil(
            zedStats[zed].health.body /
              Math.floor(
                weapon.stats.damage *
                  zedStats[zed].resistances[weapon.damageGroup]
              )
          ),
        };
      });
      result = { ...result, [weapon.name]: output };
    });
    return result;
  }
}
