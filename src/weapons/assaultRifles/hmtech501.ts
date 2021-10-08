import { AssaultRifle, AssaultRifleStats } from "../parents";

const hmtech501UpgradeStats = [
  { cost: 0, damageMultiplier: 0, recharge: 0, weight: 0 },
];

const hmtech501BaseStats = {
  baseDamage: 47,
  fullAuto: 500,
  burst: undefined,
  semiAuto: undefined,
  normalReload: {
    normal: 2.7,
    elite: 2.18,
  },
  dryReload: {
    normal: 2.44,
    elite: 1.74,
  },
  equipTime: 0.88,
  putdownTime: 0.73,
  accuracy: 70,
  penetration: 0,
  weight: 8,
  magSize: 30,
  ammo: 270,
  price: 2000,
  healingGrenade: {
    heal: 10,
    duration: 8,
  },
};

export class HMTech501 extends AssaultRifle {
  name;
  upgrade = 0;
  stats: AssaultRifleStats;
  constructor(upgrade: number) {
    super(["commando"]);
    this.name = "hmtech501";
    this.upgrade = upgrade || 0;
    this.stats = this.#baseStats();
  }

  #baseStats() {
    const upgradeStats = hmtech501UpgradeStats;
    const baseStats = hmtech501BaseStats;

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
