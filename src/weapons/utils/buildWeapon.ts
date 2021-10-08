import { assaultRifles, AssaultRifleUpgradeOptions } from "../assaultRifles";
import { rifles } from "../rifles";

const weapons = {
  ...assaultRifles,
  // ...rifles,
};

export type WeaponName = keyof typeof weapons;

export interface WeaponType<Weapon extends WeaponName> {
  name: Weapon;
  upgrade: AssaultRifleUpgradeOptions[Weapon];
}

export const buildWeapon = <Weapon extends WeaponName>(
  name: Weapon,
  upgrade: AssaultRifleUpgradeOptions[Weapon]
) => {
  // @ts-expect-error upgrade number (works correctly when function is called)
  return new weapons[name](upgrade || 0);
};
