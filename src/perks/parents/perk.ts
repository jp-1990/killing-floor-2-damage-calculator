import { DamageGroups, DamageTypes } from "../../weapons/types";

export type PerkNames = "commando";
export type PerkLevel =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;

export type PerkInputValues<S, W> = {
  name: PerkNames;
  level: PerkLevel;
  skills: S;
  damageGroups: DamageGroups[];
  damageTypes: DamageTypes[];
  perkWeapons: W;
};

export class Perk<Skills, Weapons> {
  name;
  level;
  skills;
  damageGroups;
  damageTypes;
  perkWeapons;
  /**
   * @param {object} values - name, level, skills, damageGroups, damageTypes, perkWeapons
   * @see {@link PerkInputValues}
   */
  constructor(values: PerkInputValues<Skills, Weapons>) {
    this.name = values.name;
    this.level = values.level;
    this.skills = values.skills;
    this.damageGroups = values.damageGroups;
    this.damageTypes = values.damageTypes;
    this.perkWeapons = values.perkWeapons;
  }
}
