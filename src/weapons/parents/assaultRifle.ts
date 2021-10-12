import {
  DamageModel,
  ReloadModel,
  HandlingModel,
  FireRateModel,
  AmmoModel,
} from "../types/";
import { PerkNames } from "../../perks";
import { calculateBaseStats, UpgradeStatsType } from "../utils";

export interface AssaultRifleStats {
  baseCost: number;
  upgradedCost?: number;
  baseWeight: number;
  upgradedWeight?: number;

  primaryDamage: DamageModel[];
  primaryFireRate: FireRateModel[];

  secondaryDamage?: DamageModel[];
  secondaryFireRate?: FireRateModel[];

  reload: ReloadModel[];
  handling: HandlingModel;
  ammo: AmmoModel;
}

export class AssaultRifle {
  perks: PerkNames[];
  stats: AssaultRifleStats;
  constructor(
    perks: PerkNames[],
    stats: AssaultRifleStats,
    upgradeStats: UpgradeStatsType
  ) {
    this.perks = perks;
    this.stats = calculateBaseStats(stats, upgradeStats);
  }
}
