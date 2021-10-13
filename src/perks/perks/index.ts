import { PerkLevel } from "../parents";
import { Commando, CommandoSkillOptions } from "./commando";

const perks = {
  commando: Commando,
};
export type PerkNames = keyof typeof perks;

interface SkillsType {
  commando: CommandoSkillOptions;
}

interface BuildPerkArgs<PerkName extends keyof SkillsType> {
  name: PerkName;
  level: PerkLevel;
  skills: SkillsType[PerkName];
}
export type BuildPerkType = BuildPerkArgs<keyof SkillsType>;

export const buildPerk = <PerkName extends keyof SkillsType>(
  options: BuildPerkArgs<PerkName>
) => {
  return new perks[options.name]({
    level: options.level,
    skills: options.skills,
  });
};
