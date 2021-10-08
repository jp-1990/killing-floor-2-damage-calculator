import {
  buildWeapon,
  WeaponType,
  WeaponName,
} from "../../weapons/utils/buildWeapon";

export const selectWeapons = <Weapon extends WeaponName>(
  weapons: WeaponType<Weapon>[]
) => {
  return weapons.map((el) => {
    return buildWeapon<typeof el.name>(el.name, el.upgrade);
  });
};
