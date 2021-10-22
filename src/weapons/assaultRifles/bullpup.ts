import { AssaultRifle } from "../parents";
import { FireMode, FireType, DamageGroups, DamageTypes } from "../types";

export type BullpupUpgradeOptions = 0 | 1 | 2 | 3;

const bullpupUpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 600, damageMultiplier: 0.3, weight: 1 },
  { cost: 1300, damageMultiplier: 0.65, weight: 2 },
  { cost: 2800, damageMultiplier: 0.85, weight: 3 },
];

const bullpupBaseStats = {
  cost: 650,
  weight: 5,
  primaryDamage: [
    {
      type: DamageTypes.ballistic,
      group: DamageGroups.assault_rifle,
      damage: 32,
      base: 32,
      penetration: 0,
    },
  ],
  primaryFireRate: [
    {
      type: FireMode.auto,
      rate: 660,
    },
    {
      type: FireMode.semi,
      rate: 600,
    },
  ],
  reload: [
    {
      type: FireType.primary,
      normal: {
        half: 3.12,
        dry: 2.77,
      },
      elite: {
        half: 1.93,
        dry: 1.92,
      },
    },
  ],
  handling: {
    equipTime: 0.52,
    putdownTime: 0.48,
    accuracy: 68,
  },
  ammo: {
    magSize: 30,
    spareAmmo: 270,
  },
};

export class Bullpup extends AssaultRifle {
  name;
  upgrade;
  constructor(upgrade: BullpupUpgradeOptions) {
    super(bullpupBaseStats, bullpupUpgradeStats[upgrade]);
    this.name = "bullpup";
    this.upgrade = upgrade || 0;
  }
}
