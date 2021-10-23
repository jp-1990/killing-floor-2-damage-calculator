import { WeaponStatsType, DamageModel } from "../types";

export type UpgradeStatsType = {
  cost: number;
  damageMultiplier: number;
  weight: number;
};

/**
 *
 * @param base - Base damage model
 * @param upgrade - Upgrade damage multiplier
 * @returns DamageModel with upgrade applied
 *
 * @description Function to apply damage upgrades to a damage model.
 */
const calcDamage = (
  base: DamageModel,
  multiplier: UpgradeStatsType["damageMultiplier"]
) => {
  const output = {
    ...base,
    damage: base.base + base.base * multiplier,
  };
  if (base.DoT !== undefined) {
    const DoT = base.DoT.map((el) => {
      return {
        ...el,
        damage: output.damage * el.scale,
      };
    });

    output.DoT = DoT;
  }
  return output;
};

/**
 *
 * @param baseStats - Base stats
 * @param upgradeStats - Upgrade values to apply to base stats
 * @returns WeaponStats with upgrades applied
 *
 * @description Given a set of base stats and a set of upgrade options, returns a new set of stats with the upgrades applied.
 */
export const calculateBaseStats = (
  baseStats: WeaponStatsType,
  upgradeStats: UpgradeStatsType
) => {
  const weaponDamage: ["primaryDamage", "secondaryDamage"?] = ["primaryDamage"];
  if (baseStats.secondaryDamage) weaponDamage.push("secondaryDamage");

  const output = { ...baseStats };
  output.weight = baseStats.weight + upgradeStats.weight;
  output.cost = baseStats.cost + upgradeStats.cost;

  weaponDamage.forEach((ele) => {
    if (!ele) return;
    const target = baseStats[ele];
    if (!target) return;
    // apply upgrade to damage values
    const upgradedDamageValues = target.map((el: DamageModel) => {
      return calcDamage(el, upgradeStats.damageMultiplier);
    });
    output[ele] = upgradedDamageValues;
  });

  return output;
};
