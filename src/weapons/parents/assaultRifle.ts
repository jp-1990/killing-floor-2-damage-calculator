import { WeaponStatsType } from "../types/";
import { calculateBaseStats, UpgradeStatsType } from "../utils";

export interface AssaultRifleStats extends WeaponStatsType {}

export class AssaultRifle {
  stats: AssaultRifleStats;
  constructor(stats: AssaultRifleStats, upgradeStats: UpgradeStatsType) {
    this.stats = calculateBaseStats(stats, upgradeStats);
  }
}
