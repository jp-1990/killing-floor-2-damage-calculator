import { assaultRifles, AssaultRifleUpgradeOptions } from "../../weapons";

const weapons = {
  ...assaultRifles,
};

export type WeaponName = keyof typeof weapons;
type UpgradeOptions = AssaultRifleUpgradeOptions;

export interface WeaponType<Weapon extends WeaponName> {
  name: Weapon;
  upgrade: UpgradeOptions[Weapon];
}

export const selectWeapons = <Weapon extends WeaponName>(
  weaponsInput: WeaponType<Weapon>[]
) => {
  return weaponsInput.map((el) => {
    return new weapons[el.name](el.upgrade || 0);
  });
};
