import { AssaultRifle } from "../parents";
import { FireMode, FireType, DamageGroups, DamageTypes } from "../types";

export type FAMASUpgradeOptions = 0 | 1 | 2;

const famasUpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 700, damageMultiplier: 0.125, weight: 1 },
  { cost: 2200, damageMultiplier: 0.25, weight: 2 },
];

const famasBaseStats = {
  cost: 1100,
  weight: 6,
  primaryDamage: [
    {
      type: DamageTypes.ballistic,
      group: DamageGroups.assault_rifle,
      damage: 35,
      base: 35,
      penetration: 0,
    },
  ],
  secondaryDamage: [
    {
      type: DamageTypes.ballistic,
      group: DamageGroups.shotgun,
      damage: 210,
      base: 210,
      penetration: 2,
    },
  ],
  primaryFireRate: [
    {
      type: FireMode.burst,
      rate: 899,
    },
  ],
  secondaryFireRate: [
    {
      type: FireMode.semi,
      rate: 50,
    },
  ],
  reload: [
    {
      type: FireType.primary,
      normal: {
        half: 2.81,
        dry: 2.8,
      },
      elite: {
        half: 1.85,
        dry: 1.86,
      },
    },
    {
      type: FireType.secondary,
      normal: {
        half: 2.55,
        dry: 3.15,
      },
      elite: {
        half: 1.97,
        dry: 2.08,
      },
    },
  ],
  handling: {
    equipTime: 0.67,
    putdownTime: 0.77,
    accuracy: 67,
  },
  ammo: {
    magSize: 30,
    spareAmmo: 240,
  },
};

export class FAMAS extends AssaultRifle {
  name;
  upgrade;
  constructor(upgrade: FAMASUpgradeOptions) {
    super(famasBaseStats, famasUpgradeStats[upgrade]);
    this.name = "famas";
    this.upgrade = upgrade || 0;
  }
}
