import { DamageGroups } from "../types";

/**
 *
 * @param type - DamageType to check
 * @returns boolean
 *
 * @description Given a DamageType, will return a boolean indicating whether that damage type should trace hitzones.
 */
export const traceZones = (type: DamageGroups) =>
  ![DamageGroups.explosives, DamageGroups.fire].includes(type);
