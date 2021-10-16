import { AssaultRifleStats } from "../parents/assaultRifle";

export type UpgradeStatsType = {
  cost: number;
  damageMultiplier: number;
  weight: number;
};

const calcDamage = (
  base: AssaultRifleStats["primaryDamage"][number],
  upgrade: UpgradeStatsType
) => {
  return {
    ...base,
    damage: base.base + base.base * upgrade.damageMultiplier,
  };
};

export const calculateBaseStats = (
  baseStats: AssaultRifleStats,
  upgradeStats: UpgradeStatsType
) => {
  // if no upgrade, return
  if (upgradeStats.damageMultiplier === 0) return baseStats;

  const output = { ...baseStats };
  output.weight = baseStats.weight + upgradeStats.weight;
  output.cost = baseStats.cost + upgradeStats.cost;

  // apply upgrade to primary damage values
  const upgradedPrimaryDamageValues = baseStats.primaryDamage.map((el: any) => {
    return calcDamage(el, upgradeStats);
  });
  output.primaryDamage = upgradedPrimaryDamageValues;

  // if no secondary damage, return
  if (!baseStats.secondaryDamage) return output;

  // apply upgrade to secondary demage values
  const upgradedSecondaryDamageValues = baseStats.secondaryDamage.map(
    (el: any) => {
      return calcDamage(el, upgradeStats);
    }
  );
  output.secondaryDamage = upgradedSecondaryDamageValues;

  return output;
};
