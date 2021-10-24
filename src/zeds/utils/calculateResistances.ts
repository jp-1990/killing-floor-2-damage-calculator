import { DamageGroups } from "../../weapons/types";

type BasicResistancesType = { [K in DamageGroups]?: number };
type Players = 1 | 2 | 3 | 4 | 5 | 6;

/**
 *
 * @param resistances - ZED resistances object
 * @param players - number of players in the game
 * @returns modified resistances if players = 1
 *
 * @description Recursively applies the formula (1 - (1 - <Resistance>) * 0.75) to ZED resistances in a solo game as per info provided on the KF2 wiki.
 */
export const calculateResistances = (
  resistances: BasicResistancesType,
  players: Players
) => {
  if (players !== 1) return resistances;

  const buildResistances = (
    keys: (keyof BasicResistancesType)[],
    object: BasicResistancesType,
    resistances: BasicResistancesType
  ): BasicResistancesType => {
    if (keys.length === 0) return object;

    object[keys[0]] = Number(
      (1 - (1 - (resistances[keys[0]] || 1)) * 0.75).toFixed(5)
    );
    return buildResistances(keys.slice(1), object, resistances);
  };

  const keys = Object.keys(resistances) as (keyof BasicResistancesType)[];
  return buildResistances(keys, {}, resistances);
};
