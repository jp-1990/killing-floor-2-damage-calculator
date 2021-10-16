import { PerkLevel } from "../parents";
import { WeaponStatsType } from "../../weapons/types";
import {
  applyCommandoModifiers,
  Commando,
  CommandoSkillOptions,
} from "./commando";

const perks = {
  commando: Commando,
};
interface SkillsType {
  commando: CommandoSkillOptions;
}
type Select<T> = { [K in keyof T]: { name: K; skills: T[K] } };
type SelectPerk = Select<SkillsType>;
interface BuildPerkArgs<PerkName extends keyof SkillsType> {
  name: PerkName;
  level: PerkLevel;
  skills: SelectPerk[PerkName]["skills"];
}

export type PerkNames = keyof typeof perks;
export type BuildPerkType = BuildPerkArgs<keyof SkillsType>;
export const buildPerk = <PerkName extends keyof SkillsType>(
  options: BuildPerkArgs<PerkName>
) => {
  return new perks[options.name]({
    level: options.level,
    skills: options.skills,
  });
};

const modifiers = {
  commando: applyCommandoModifiers,
};
type PerkModifiers = keyof typeof modifiers;
type WeaponType = { name: string; stats: WeaponStatsType; upgrade: number };
interface ApplyModifiersArgs<N extends PerkModifiers> {
  name: N;
  weaponInput: WeaponType;
  skills: SelectPerk[N]["skills"];
  skillModifiers: { [key: string]: number };
  passiveModifiers: { [key: string]: number };
}
export const applyModifiers = <N extends PerkModifiers>(
  input: ApplyModifiersArgs<N>
) => {
  const { name, ...args } = input;
  return modifiers[input.name](args);
};
