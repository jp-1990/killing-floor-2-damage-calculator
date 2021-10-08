import { AssaultRifle, AssaultRifleStats } from "../parents";

const minigunUpgradeStats = [{ cost: 0, damageMultiplier: 0, weight: 0 }];

const minigunBaseStats = {
  baseDamage: 35,
  fullAuto: 1200,
  burst: undefined,
  semiAuto: undefined,
  normalReload: {
    normal: 5.59,
    elite: 3.91,
  },
  dryReload: {
    normal: 5.59,
    elite: 3.91,
  },
  equipTime: 1.25,
  putdownTime: 1.07,
  accuracy: 68,
  penetration: 2,
  weight: 10,
  magSize: 90,
  ammo: 540,
  price: 2000,
};

export class Minigun extends AssaultRifle {
  name;
  upgrade = 0;
  stats: AssaultRifleStats;
  constructor(upgrade: number) {
    super(["commando"]);
    this.name = "minigun";
    this.upgrade = upgrade || 0;
    this.stats = this.#baseStats();
  }

  #baseStats() {
    const upgradeStats = minigunUpgradeStats;
    const baseStats = minigunBaseStats;

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
