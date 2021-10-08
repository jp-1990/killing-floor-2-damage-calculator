import { Rifle, RifleStats } from "../parents";

const fnfalUpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 1500, damageMultiplier: 0.15, weight: 1 },
];

const fnfalBaseStats = {
  baseDamage: 70,
  fullAuto: undefined,
  burst: 606,
  semiAuto: 272,
  normalReload: {
    normal: 3.01,
    elite: 2.19,
  },
  dryReload: {
    normal: 2.68,
    elite: 2.03,
  },
  equipTime: 0.45,
  putdownTime: 0.73,
  accuracy: 67,
  penetration: 2,
  weight: 4,
  magSize: 20,
  ammo: 160,
  price: 1500,
};

export class FNFAL extends Rifle {
  name;
  upgrade = 0;
  stats: RifleStats;
  constructor(upgrade: number) {
    super(["commando"]);
    this.name = "fnfal";
    this.upgrade = upgrade || 0;
    this.stats = this.#baseStats();
  }

  #baseStats() {
    const upgradeStats = fnfalUpgradeStats;
    const baseStats = fnfalBaseStats;

    return {
      ...baseStats,
      damage:
        baseStats.baseDamage +
        baseStats.baseDamage * upgradeStats[this.upgrade].damageMultiplier,
      weight: baseStats.weight + upgradeStats[this.upgrade].weight,
      price: baseStats.price + upgradeStats[this.upgrade].cost,
    };
  }
}
