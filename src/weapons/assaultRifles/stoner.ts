import { AssaultRifle, AssaultRifleStats } from "../parents";

const stonerUpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 500, damageMultiplier: 0.27, weight: 1 },
];

const stonerBaseStats = {
  baseDamage: 30,
  fullAuto: 909,
  burst: undefined,
  semiAuto: undefined,
  normalReload: {
    normal: 4.58,
    elite: 3.23,
  },
  halfReload: {
    normal: 5.15,
    elite: 3.29,
  },
  dryReload: {
    normal: 4.59,
    elite: 3.35,
  },
  equipTime: 0.78,
  putdownTime: 0.73,
  accuracy: 68,
  penetration: 0,
  weight: 9,
  magSize: 75,
  ammo: 500,
  price: 1500,
};

export class Stoner extends AssaultRifle {
  name;
  upgrade = 0;
  stats: AssaultRifleStats;
  constructor(upgrade: number) {
    super(["commando"]);
    this.name = "stoner";
    this.upgrade = upgrade || 0;
    this.stats = this.#baseStats();
  }

  #baseStats() {
    const upgradeStats = stonerUpgradeStats;
    const baseStats = stonerBaseStats;

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
