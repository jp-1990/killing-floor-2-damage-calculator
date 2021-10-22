import { DamageTypes } from "../types";

/**
 *
 * @param type - DamageType to check
 * @returns boolean
 *
 * @description Given a DamageType, will return a boolean indicating whether that damage type should trace headshots.
 */
export const traceHead = (type: DamageTypes) =>
  ![DamageTypes.explosive, DamageTypes.fire].includes(type);
