import { AssaultRifle, AssaultRifleStats } from "../parents";

const scarUpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 1500, damageMultiplier: 0.22, weight: 1 },
];

const scarBaseStats = {
  baseDamage: 55,
  fullAuto: 625,
  burst: undefined,
  semiAuto: 600,
  normalReload: {
    normal: 2.78,
    elite: 2.07,
  },
  dryReload: {
    normal: 2.62,
    elite: 1.81,
  },
  equipTime: 0.5,
  putdownTime: 0.48,
  accuracy: 70,
  penetration: 0,
  weight: 6,
  magSize: 20,
  ammo: 340,
  price: 1500,
};

export class SCAR extends AssaultRifle {
  name;
  upgrade = 0;
  stats: AssaultRifleStats;
  constructor(upgrade: number) {
    super(["commando"]);
    this.name = "scar";
    this.upgrade = upgrade || 0;
    this.stats = this.#baseStats();
  }

  #baseStats() {
    const upgradeStats = scarUpgradeStats;
    const baseStats = scarBaseStats;

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
