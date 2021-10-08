import { AssaultRifle } from "../parents";
import { formatBaseStats } from "../utils/formatBaseStats";

export type BullpupUpgradeOptions = 0 | 1 | 2 | 3;

const bullpupUpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 600, damageMultiplier: 0.3, weight: 1 },
  { cost: 1300, damageMultiplier: 0.65, weight: 2 },
  { cost: 2800, damageMultiplier: 0.85, weight: 3 },
];

const bullpupBaseStats = formatBaseStats({
  cost: 650,
  weight: 5,
  baseDamage: 32,
  penetration: 0,
  fullAuto: 660,
  semiAuto: 600,
  normalReload: {
    normal: 3.12,
    elite: 1.93,
  },
  dryReload: {
    normal: 2.77,
    elite: 1.92,
  },
  equipTime: 0.52,
  putdownTime: 0.48,
  accuracy: 68,
  magSize: 30,
  spareAmmo: 270,
});

export class Bullpup extends AssaultRifle {
  name;
  upgrade = 0;
  constructor(upgrade: BullpupUpgradeOptions) {
    super(["commando"], bullpupBaseStats, bullpupUpgradeStats[upgrade]);
    this.name = "ar15";
    this.upgrade = upgrade || 0;
  }
}
