import { AssaultRifle } from "../parents";
import { FireMode, FireType, DamageGroups, DamageTypes } from "../types";

export type AK12UpgradeOptions = 0 | 1 | 2;

const ak12UpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 700, damageMultiplier: 0.15, weight: 1 },
  { cost: 2200, damageMultiplier: 0.3, weight: 2 },
];

const ak12BaseStats = {
  cost: 1100,
  weight: 6,
  primaryDamage: [
    {
      type: DamageTypes.ballistic,
      group: DamageGroups.assault_rifle,
      damage: 40,
      penetration: 0,
    },
  ],
  primaryFireRate: [
    {
      type: FireMode.auto,
      rate: 600,
    },
    {
      type: FireMode.burst,
      rate: 1000,
    },
  ],
  reload: [
    {
      type: FireType.primary,
      normal: {
        half: 3.3,
        dry: 2.9,
      },
      elite: {
        half: 2.29,
        dry: 2.2,
      },
    },
  ],
  handling: {
    equipTime: 0.52,
    putdownTime: 0.48,
    accuracy: 67,
  },
  ammo: {
    magSize: 30,
    spareAmmo: 300,
  },
};

export class AK12 extends AssaultRifle {
  name;
  upgrade;
  constructor(upgrade: AK12UpgradeOptions) {
    super(ak12BaseStats, ak12UpgradeStats[upgrade]);
    this.name = "ak12";
    this.upgrade = upgrade || 0;
  }
}
