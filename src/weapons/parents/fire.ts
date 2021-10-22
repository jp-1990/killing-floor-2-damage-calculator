import { WeaponStatsType } from "../types/";
import { calculateBaseStats, UpgradeStatsType } from "../utils";

export interface FireStats extends WeaponStatsType {}

export class Fire {
  stats: FireStats;
  constructor(stats: FireStats, upgradeStats: UpgradeStatsType) {
    this.stats = calculateBaseStats(stats, upgradeStats);
  }
}
