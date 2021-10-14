import { Perk, PerkInputValues } from "../parents";
import { DamageGroups, DamageTypes } from "../../weapons/types";

const level5 = {
  "tactical reload": [{ eliteReload: 1 }],
  "high capacity mags": [{ magSize: 0.5 }],
};
const level10 = {
  fallback: [{ "9mm": 0.85 }, { knife: 0.85 }, { weaponSwitch: 0.5 }],
  "impact rounds": [{ stumblePower: 1.5 }],
};
const level15 = {
  tenacious: [{ health: 0.25 }, { armour: 0.25 }],
  prepared: [{ spareAmmo: 0.2 }],
};
const level20 = {
  "hollow point rounds": [{ damage: 0.3 }],
  "eat lead": [{ magSize: 1 }],
};

type L5 = keyof typeof level5;
type L10 = keyof typeof level10;
type L15 = keyof typeof level15;
type L20 = keyof typeof level20;
export type CommandoSkillOptions = [L5?, L10?, L15?, L20?];

const commandoSkills = {
  ...level5,
  ...level10,
  ...level15,
  ...level20,
};

const commandoWeapons = [
  "9mm",
  "ak12",
  "ar15",
  "bullpup",
  "famas",
  "fnfal",
  "hegrenade",
  "hmtech401",
  "hmtech501",
  "kfbar",
  "m16",
  "minigun",
  "mkb42",
  "scar",
  "stoner",
  "tommy",
];
type CommandoPerkWeapons = typeof commandoWeapons;

/**
 * @param {object} values - object containing level and skills array
 * @param {number} values.level - number (0 - 25)
 * @param {CommandoSkillOptions} values.skills - array containing string values of skill names
 *
 * @returns {object} Commando object - name, level, skills, damageGroups, damageTypes, perkWeapons, passiveModifiers, perkModifiers
 */
export class Commando extends Perk<CommandoSkillOptions, CommandoPerkWeapons> {
  passiveModifiers;
  skillModifiers;
  /**
   * @param {object} values - object containing level and skills array
   * @param {number} values.level - number (0 - 25)
   * @param {CommandoSkillOptions} values.skills - array containing string values of skill names
   *
   * @returns {object} Commando object - name, level, skills, damageGroups, damageTypes, perkWeapons, passiveModifiers, perkModifiers
   */
  constructor(
    values: Omit<
      PerkInputValues<CommandoSkillOptions, []>,
      "name" | "damageGroups" | "damageTypes" | "perkWeapons"
    >
  ) {
    super({
      name: "commando",
      level: values.level,
      skills: values.skills || [],
      damageGroups: [DamageGroups.assault_rifle],
      damageTypes: [DamageTypes.ballistic],
      perkWeapons: commandoWeapons,
    });
    this.passiveModifiers = this.#calcPassiveModifiers();
    this.skillModifiers = this.#calcSkillModifiers();
  }
  #calcPassiveModifiers() {
    return {
      damage: this.level / 100,
      resets: 1 + Math.floor(this.level / 5),
      reload: (Math.floor(this.level / 5) * 2) / 100,
      recoil: (this.level * 2) / 100,
      sightRange: 10 + this.level * 2,
    };
  }
  #calcSkillModifiers() {
    let output = {};
    this.skills.forEach((skill) => {
      skill &&
        commandoSkills[skill].forEach((modifier) => {
          output = { ...output, ...modifier };
        });
    });
    return output;
  }
}
