import { AssaultRifle, AssaultRifleStats } from "../parents";

const mkb42UpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 700, damageMultiplier: 0.2, weight: 1 },
  { cost: 2200, damageMultiplier: 0.4, weight: 2 },
];

const mkb42BaseStats = {
  baseDamage: 50,
  fullAuto: 500,
  burst: undefined,
  semiAuto: 500,
  normalReload: {
    normal: 3.26,
    elite: 2.53,
  },
  dryReload: {
    normal: 3.12,
    elite: 1.91,
  },
  equipTime: 0.52,
  putdownTime: 0.46,
  accuracy: 67,
  penetration: 0,
  weight: 7,
  magSize: 30,
  ammo: 270,
  price: 1100,
};

export class Mkb42 extends AssaultRifle {
  name;
  upgrade;
  stats: AssaultRifleStats;
  constructor(upgrade: number) {
    super(["commando"]);
    this.name = "mkb42";
    this.upgrade = upgrade || 0;
    this.stats = this.#baseStats();
  }

  #baseStats() {
    const upgradeStats = mkb42UpgradeStats;
    const baseStats = mkb42BaseStats;

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
