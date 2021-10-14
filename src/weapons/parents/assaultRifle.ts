import {
  DamageModel,
  ReloadModel,
  HandlingModel,
  FireRateModel,
  AmmoModel,
} from "../types/";
import { calculateBaseStats, UpgradeStatsType } from "../utils";

export interface AssaultRifleStats {
  cost: number;
  weight: number;

  primaryDamage: DamageModel[];
  primaryFireRate: FireRateModel[];

  secondaryDamage?: DamageModel[];
  secondaryFireRate?: FireRateModel[];

  reload: ReloadModel[];
  handling: HandlingModel;
  ammo: AmmoModel;
}

export class AssaultRifle {
  stats: AssaultRifleStats;
  constructor(stats: AssaultRifleStats, upgradeStats: UpgradeStatsType) {
    this.stats = calculateBaseStats(stats, upgradeStats);
  }
}
