import { Perk, PerkInputValues } from "../parents";
import { DamageGroups, DamageTypes } from "../../weapons/types";

const level5 = {
  "tactical reload": [{ eliteReload: 1 }],
  "high capacity mags": [{ magSizeIncrease: 0.5 }],
};
const level10 = {
  fallback: [{ "9mm": 0.85 }, { knife: 0.85 }, { weaponSwitchIncrease: 0.5 }],
  "impact rounds": [{ stumblePowerIncrease: 1.5 }],
};
const level15 = {
  tenacious: [{ healthIncrease: 0.25 }, { armourIncrease: 0.25 }],
  prepared: [{ maxAmmoIncrease: 0.2 }],
};
const level20 = {
  "hollow point rounds": [{ damageMultiplier: 0.3 }],
  "eat lead": [{ magSizeIncrease: 1 }],
};

type PerkSkillOptions = [
  keyof typeof level5 | undefined,
  keyof typeof level10 | undefined,
  keyof typeof level15 | undefined,
  keyof typeof level20 | undefined
];

const commandoSkills = {
  ...level5,
  ...level10,
  ...level15,
  ...level20,
};

export class Commando extends Perk<PerkSkillOptions> {
  constructor(
    values: Omit<
      PerkInputValues<PerkSkillOptions>,
      "name" | "damageGroups" | "damageTypes"
    >
  ) {
    super({
      name: "commando",
      level: values.level,
      skills: values.skills || [],
      damageGroups: [DamageGroups.assault_rifle],
      damageTypes: [DamageTypes.ballistic],
    });
  }
}
