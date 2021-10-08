import { AssaultRifle } from "../parents";
import { formatBaseStats } from "../utils/formatBaseStats";

export type AR15UpgradeOptions = 0 | 1 | 2 | 3 | 4;

const ar15UpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 500, damageMultiplier: 0.2, weight: 1 },
  { cost: 1100, damageMultiplier: 0.4, weight: 2 },
  { cost: 1800, damageMultiplier: 0.8, weight: 3 },
  { cost: 3300, damageMultiplier: 1, weight: 4 },
];

const ar15BaseStats = formatBaseStats({
  cost: 200,
  weight: 4,
  baseDamage: 30,
  penetration: 0,
  burst: 500,
  semiAuto: 500,
  normalReload: {
    normal: 3.07,
    elite: 2.07,
  },
  dryReload: {
    normal: 2.67,
    elite: 1.75,
  },
  equipTime: 0.56,
  putdownTime: 0.47,
  accuracy: 60,
  magSize: 20,
  spareAmmo: 240,
});

export class AR15 extends AssaultRifle {
  name;
  upgrade = 0;
  constructor(upgrade: AR15UpgradeOptions) {
    super(["commando"], ar15BaseStats, ar15UpgradeStats[upgrade]);
    this.name = "ar15";
    this.upgrade = upgrade || 0;
  }
}
