import { DamageGroups, DamageTypes } from "../../weapons/types";

type PerkNames = "commando";
type PerkLevel =
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

export type PerkInputValues<S> = {
  name: PerkNames;
  level: PerkLevel;
  skills: S;
  damageGroups: DamageGroups[];
  damageTypes: DamageTypes[];
};

export class Perk<Skills> {
  name;
  level;
  skills;
  damageGroups;
  damageTypes;
  /**
   * @param {object} values - name, level, skills, damageGroups, damageTypes
   * @see {@link InputValuesType}
   */
  constructor(values: PerkInputValues<Skills>) {
    this.name = values.name;
    this.level = values.level;
    this.skills = values.skills;
    this.damageGroups = values.damageGroups;
    this.damageTypes = values.damageTypes;
  }
}
