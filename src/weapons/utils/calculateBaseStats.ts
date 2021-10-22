import { WeaponStatsType, DamageModel, FireRateModel } from "../types";

export type UpgradeStatsType = {
  cost: number;
  damageMultiplier: number;
  weight: number;
};

/**
 *
 * @param base - Base damage model
 * @param upgrade - Upgrade damage multiplier
 * @param fireRate - Fire rate array
 * @returns DamageModel with upgrade applied
 *
 * @description Function to apply damage upgrades to a damage model, and calculate DoT damage per ammo for weapons that apply a DoT.
 */
const calcDamage = (
  base: DamageModel,
  multiplier: UpgradeStatsType["damageMultiplier"],
  fireRate: FireRateModel[] | undefined
) => {
  const output = {
    ...base,
    damage: base.base + base.base * multiplier,
  };
  if (base.DoT !== undefined && fireRate) {
    const DoT = base.DoT;
    const damagePerAmmo = fireRate.map((el) => {
      return {
        type: el.type,
        // ((ticks * damage) * ( 1 / duration)) / shots per second
        damage:
          (Math.floor(DoT.duration / DoT.interval) *
            (output.damage * DoT.scale) *
            (1 / DoT.duration)) /
          (el.rate / 60),
      };
    });
    output.DoT = {
      ...base.DoT,
      damage: output.damage * DoT.scale,
      damagePerAmmo,
    };
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
    const fireRate =
      ele === "primaryDamage" ? "primaryFireRate" : "secondaryFireRate";
    // apply upgrade to primary damage values
    const upgradedDamageValues = target.map((el: DamageModel) => {
      return calcDamage(el, upgradeStats.damageMultiplier, baseStats[fireRate]);
    });
    output[ele] = upgradedDamageValues;
  });

  return output;
};
