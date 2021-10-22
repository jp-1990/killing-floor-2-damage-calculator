import { Fire } from "../parents";
import { FireMode, FireType, DamageGroups, DamageTypes } from "../types";

export type FlamethrowerUpgradeOptions = 0 | 1;

const flamethrowerUpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 700, damageMultiplier: 0.15, weight: 1 },
  { cost: 2200, damageMultiplier: 0.2, weight: 2 },
];

const flamethrowerBaseStats = {
  cost: 1100,
  weight: 7,
  primaryDamage: [
    {
      type: DamageTypes.fire,
      group: DamageGroups.fire,
      damage: 18,
      base: 18,
      penetration: 0,
      DoT: {
        scale: 0.8,
        duration: 1.7,
        interval: 0.5,
      },
    },
  ],
  primaryFireRate: [
    {
      type: FireMode.auto,
      rate: 857,
    },
  ],
  reload: [
    {
      type: FireType.primary,
      normal: {
        half: 2.57,
        dry: 2.57,
      },
    },
  ],
  handling: {
    equipTime: 0.3,
    putdownTime: 0.46,
    accuracy: 17,
  },
  ammo: {
    magSize: 100,
    spareAmmo: 500,
  },
};

export class Flamethrower extends Fire {
  name;
  upgrade;
  constructor(upgrade: FlamethrowerUpgradeOptions) {
    super(flamethrowerBaseStats, flamethrowerUpgradeStats[upgrade]);
    this.name = "flameThrower";
    this.upgrade = upgrade || 0;
  }
}
