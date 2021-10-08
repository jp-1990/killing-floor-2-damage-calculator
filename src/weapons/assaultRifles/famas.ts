import { AssaultRifle, AssaultRifleStats } from "../parents";

const famasUpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 700, damageMultiplier: 0.125, weight: 1 },
  { cost: 2200, damageMultiplier: 0.25, weight: 2 },
];

const famasBaseStats = {
  baseDamage: 35,
  fullAuto: undefined,
  burst: 899,
  semiAuto: undefined,
  baseSecondaryDamage: 210,
  secondaryDamageType: "shotgun",
  secondaryFireRate: 50,
  normalReload: {
    normal: 2.81,
    elite: 1.85,
  },
  dryReload: {
    normal: 2.8,
    elite: 1.86,
  },
  equipTime: 0.67,
  putdownTime: 0.77,
  accuracy: 67,
  penetration: 1,
  weight: 6,
  magSize: 30,
  ammo: 240,
  price: 1200,
};

export class FAMAS extends AssaultRifle {
  name;
  upgrade;
  stats: AssaultRifleStats;
  constructor(upgrade: number) {
    super(["commando"]);
    this.name = "famas";
    this.upgrade = upgrade || 0;
    this.stats = this.#baseStats();
  }

  #baseStats() {
    const upgradeStats = famasUpgradeStats;
    const baseStats = famasBaseStats;

    return {
      ...baseStats,
      damage:
        baseStats.baseDamage +
        baseStats.baseDamage * upgradeStats[this.upgrade].damageMultiplier,
      secondaryDamage:
        baseStats.baseSecondaryDamage +
        baseStats.baseSecondaryDamage *
          upgradeStats[this.upgrade].damageMultiplier,
      weight: baseStats.weight + upgradeStats[this.upgrade].weight,
      price: baseStats.price + upgradeStats[this.upgrade].cost,
    };
  }
}
