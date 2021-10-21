import { Explosive } from "../parents";
import { FireMode, FireType, DamageGroups, DamageTypes } from "../types";

export type RPG7UpgradeOptions = 0 | 1;

const rpg7UpgradeStats = [
  { cost: 0, damageMultiplier: 0, weight: 0 },
  { cost: 1500, damageMultiplier: 0.1, weight: 1 },
];

const rpg7BaseStats = {
  cost: 1500,
  weight: 9,
  primaryDamage: [
    {
      type: DamageTypes.ballistic_shell,
      group: DamageGroups.rpg7_impact,
      damage: 150,
      base: 150,
      penetration: 0,
    },
    {
      type: DamageTypes.explosive,
      group: DamageGroups.explosives,
      damage: 750,
      base: 750,
      penetration: 0,
    },
  ],
  primaryFireRate: [
    {
      type: FireMode.semi,
      rate: 20,
    },
  ],
  reload: [
    {
      type: FireType.primary,
      normal: {
        dry: 2.37,
      },
      elite: {
        dry: 1.58,
      },
    },
  ],
  handling: {
    equipTime: 0.6,
    putdownTime: 0.6,
    accuracy: 100,
  },
  ammo: {
    magSize: 1,
    spareAmmo: 15,
  },
};

export class RPG7 extends Explosive {
  name;
  upgrade;
  constructor(upgrade: RPG7UpgradeOptions) {
    super(rpg7BaseStats, rpg7UpgradeStats[upgrade]);
    this.name = "rpg7";
    this.upgrade = upgrade || 0;
  }
}
