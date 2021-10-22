import { AssaultRifle } from "../parents";
import { FireMode, FireType, DamageGroups, DamageTypes } from "../types";

export type AR15UpgradeOptions = 0 | 1 | 2 | 3 | 4;

const ar15UpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 500, damageMultiplier: 0.2, weight: 1 },
  { cost: 1100, damageMultiplier: 0.4, weight: 2 },
  { cost: 1800, damageMultiplier: 0.8, weight: 3 },
  { cost: 3300, damageMultiplier: 1, weight: 4 },
];

const ar15BaseStats = {
  cost: 200,
  weight: 4,
  primaryDamage: [
    {
      type: DamageTypes.ballistic,
      group: DamageGroups.assault_rifle,
      damage: 30,
      base: 30,
      penetration: 0,
    },
  ],
  primaryFireRate: [
    {
      type: FireMode.semi,
      rate: 500,
    },
    {
      type: FireMode.burst,
      rate: 500,
    },
  ],
  reload: [
    {
      type: FireType.primary,
      normal: {
        half: 3.07,
        dry: 2.67,
      },
      elite: {
        half: 2.07,
        dry: 1.75,
      },
    },
  ],
  handling: {
    equipTime: 0.56,
    putdownTime: 0.47,
    accuracy: 60,
  },
  ammo: {
    magSize: 20,
    spareAmmo: 240,
  },
};

export class AR15 extends AssaultRifle {
  name;
  upgrade;
  constructor(upgrade: AR15UpgradeOptions) {
    super(ar15BaseStats, ar15UpgradeStats[upgrade]);
    this.name = "ar15";
    this.upgrade = upgrade || 0;
  }
}
