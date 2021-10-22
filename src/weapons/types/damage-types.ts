export enum DamageTypes {
  ballistic = "ballistic",
  ballistic_shell = "ballistic_shell",
  bleeding = "bleeding",
  bludgeon = "bludgeon",
  emp = "emp",
  explosive = "explosive",
  fire = "fire",
  freeze = "freeze",
  microwave = "microwave",
  piercing = "piercing",
  slashing = "slashing",
  toxic = "toxic",
}

/**
 *
 * @param type - DamageType to check
 * @returns boolean
 *
 * @description Given a DamageType, will return a boolean indicating whether that damage type should trace headshots.
 */
export const traceHead = (type: DamageTypes) =>
  ![DamageTypes.explosive, DamageTypes.fire].includes(type);
