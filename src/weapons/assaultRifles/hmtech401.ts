import { AssaultRifle, AssaultRifleStats } from "../parents";

const hmtech401UpgradeStats = [
  { cost: 0, damageMultiplier: 0, recharge: 0, weight: 0 },
  { cost: 500, damageMultiplier: 0.15, recharge: 0.9, weight: 1 },
];

const hmtech401BaseStats = {
  baseDamage: 35,
  fullAuto: 750,
  burst: undefined,
  semiAuto: undefined,
  normalReload: {
    normal: 2.55,
    elite: 1.94,
  },
  dryReload: {
    normal: 2.5,
    elite: 1.84,
  },
  equipTime: 0.53,
  putdownTime: 0.46,
  accuracy: 70,
  penetration: 0,
  weight: 7,
  magSize: 40,
  ammo: 400,
  price: 1500,
  healing: {
    heal: 15,
    cost: 0.3,
    recharge: 10,
  },
};

export class HMTech401 extends AssaultRifle {
  name;
  upgrade = 0;
  stats: AssaultRifleStats;
  constructor(upgrade: number) {
    super(["commando"]);
    this.name = "hmtech401";
    this.upgrade = upgrade || 0;
    this.stats = this.#baseStats();
  }

  #baseStats() {
    const upgradeStats = hmtech401UpgradeStats;
    const baseStats = hmtech401BaseStats;

    return {
      ...baseStats,
      damage:
        baseStats.baseDamage +
        baseStats.baseDamage * upgradeStats[this.upgrade].damageMultiplier,
      healing: {
        ...baseStats.healing,
        recharge:
          baseStats.healing.recharge * upgradeStats[this.upgrade].recharge,
      },
      weight: baseStats.weight + upgradeStats[this.upgrade].weight,
      price: baseStats.price + upgradeStats[this.upgrade].cost,
    };
  }
}
