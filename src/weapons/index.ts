import { assaultRifles, AssaultRifleUpgradeOptions } from "./assaultRifles";
import { rifles, RifleUpgradeOptions } from "./rifles";

const weapons = {
  ...assaultRifles,
  // ...rifles,
};
export type WeaponName = keyof typeof weapons;

type UpgradeOptions = AssaultRifleUpgradeOptions & RifleUpgradeOptions;

type Select<T> = { [K in keyof T]: { name: K; upgrade: T[K] } };
type SelectWeapon = Select<UpgradeOptions>;

type WeaponType<Weapon extends WeaponName> = SelectWeapon[Weapon];

export type SelectWeaponsType = WeaponType<WeaponName>;

export const selectWeapons = <Weapon extends WeaponName>(
  weaponsInput: WeaponType<Weapon>[]
) => {
  return weaponsInput.map((el) => {
    return new weapons[el.name](el.upgrade || 0);
  });
};
