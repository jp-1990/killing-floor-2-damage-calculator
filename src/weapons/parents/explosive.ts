import { WeaponStatsType } from "../types/";
import { calculateBaseStats, UpgradeStatsType } from "../utils";

export interface ExplosiveStats extends WeaponStatsType {}

export class Explosive {
  stats: ExplosiveStats;
  constructor(stats: ExplosiveStats, upgradeStats: UpgradeStatsType) {
    this.stats = calculateBaseStats(stats, upgradeStats);
  }
}
