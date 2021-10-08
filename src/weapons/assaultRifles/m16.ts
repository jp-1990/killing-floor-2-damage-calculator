import { AssaultRifle, AssaultRifleStats } from "../parents";

const m16UpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 700, damageMultiplier: 0.2, weight: 1 },
  { cost: 2200, damageMultiplier: 0.4, weight: 2 },
];

const m16BaseStats = {
  baseDamage: 33,
  baseProjectileImpact: 230,
  projectileImpactDamageType: "shell",
  baseProjectileExplosive: 230,
  projectileExplosiveDamageType: "explosive",
  fullAuto: 669,
  burst: undefined,
  semiAuto: undefined,
  normalReload: {
    normal: 2.46,
    elite: 1.83,
  },
  dryReload: {
    normal: 2.47,
    elite: 1.07,
  },
  equipTime: 0.53,
  putdownTime: 0.48,
  accuracy: 68,
  penetration: 0,
  weight: 6,
  magSize: 30,
  ammo: 270,
  price: 1200,
};

export class M16 extends AssaultRifle {
  name;
  upgrade = 0;
  stats: AssaultRifleStats;
  constructor(upgrade: number) {
    super(["commando"]);
    this.name = "m16";
    this.upgrade = upgrade || 0;
    this.stats = this.#baseStats();
  }

  #baseStats() {
    const upgradeStats = m16UpgradeStats;
    const baseStats = m16BaseStats;

    return {
      ...baseStats,
      damage:
        baseStats.baseDamage +
        baseStats.baseDamage * upgradeStats[this.upgrade].damageMultiplier,
      projectileImpact:
        baseStats.baseProjectileImpact +
        baseStats.baseProjectileImpact *
          upgradeStats[this.upgrade].damageMultiplier,
      projectileExplosive:
        baseStats.baseProjectileExplosive +
        baseStats.baseProjectileExplosive *
          upgradeStats[this.upgrade].damageMultiplier,
      weight: baseStats.weight + upgradeStats[this.upgrade].weight,
      price: baseStats.price + upgradeStats[this.upgrade].cost,
    };
  }
}
