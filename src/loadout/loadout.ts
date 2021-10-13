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
    // this.applyPerkBonuses();
    // this.shotsToKill = this.calcShotsToKill();
  }

  // applyPerkBonuses() {
  //   this.weapons.forEach((weapon) => {
  //     weapon.stats.damage +=
  //       weapon.stats.baseDamage * this.playerStats.stats.damageMultiplier;
  //   });
  // }

  // calcShotsToKill() {
  //   const zedStats = buildZeds(this.game);

  //   let result = {};
  //   this.weapons.forEach((weapon) => {
  //     const output: { [key: string]: { head: number; body: number } } = {};
  //     Object.keys(zedStats).forEach((el) => {
  //       const zed = el as keyof typeof zedStats;
  //       output[zed] = {
  //         head: Math.ceil(
  //           zedStats[zed].health.head /
  //             Math.floor(
  //               Math.floor(weapon.stats.damage * zedStats[zed].hitzones.head) *
  //                 zedStats[zed].resistances[weapon.damageGroup]
  //             )
  //         ),
  //         body: Math.ceil(
  //           zedStats[zed].health.body /
  //             Math.floor(
  //               weapon.stats.damage *
  //                 zedStats[zed].resistances[weapon.damageGroup]
  //             )
  //         ),
  //       };
  //     });
  //     result = { ...result, [weapon.name]: output };
  //   });
  //   return result;
  // }
}
