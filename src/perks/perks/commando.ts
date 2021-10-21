import { Perk, PerkInputValues } from "../parents";
import {
  DamageGroups,
  DamageTypes,
  WeaponStatsType,
} from "../../weapons/types";

const level5 = {
  "tactical reload": [{ eliteReload: 1 }],
  "high capacity mags": [{ magSize: 0.5 }],
} as const;
const level10 = {
  fallback: [{ "9mm": 0.85 }, { knife: 0.85 }, { weaponSwitch: 0.5 }],
  "impact rounds": [{ stumblePower: 1.5 }],
} as const;
const level15 = {
  tenacious: [{ health: 0.25 }, { armour: 0.25 }],
  prepared: [{ spareAmmo: 0.2 }],
} as const;
const level20 = {
  "hollow point rounds": [{ damage: 0.3 }],
  "eat lead": [{ magSize: 1 }],
} as const;

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
 * @param {object} values - object containing level(0 - 25) and skills array {@link CommandoSkillOptions}[ ].
 *
 * @returns {object} Commando object - name, level, skills, damageGroups, damageTypes, perkWeapons, passiveModifiers, perkModifiers.
 */
export class Commando extends Perk<CommandoSkillOptions, CommandoPerkWeapons> {
  passiveModifiers;
  skillModifiers;
  /**
   * @param {object} values - object containing level(0 - 25) and skills array {@link CommandoSkillOptions}[ ].
   *
   * @returns {object} Commando object - name, level, skills, damageGroups, damageTypes, perkWeapons, passiveModifiers, perkModifiers.
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
    let output: { [key: string]: number } = {};
    this.skills.forEach((skill) => {
      skill &&
        commandoSkills[skill].forEach((modifier) => {
          if (
            skill === "eat lead" &&
            this.skills.includes("high capacity mags")
          ) {
            const newModifier = { magSize: 1.5 };
            return (output = { ...output, ...newModifier });
          }
          output = { ...output, ...modifier };
        });
    });
    return output;
  }
}

export interface ApplyCommandoModifiersArg<T> {
  weaponInput: T;
  skills: CommandoSkillOptions;
  skillModifiers: { [key: string]: number };
  passiveModifiers: { [key: string]: number };
}
export const applyCommandoModifiers = <
  T extends { name: string; stats: WeaponStatsType }
>({
  weaponInput,
  skills,
  skillModifiers,
  passiveModifiers,
}: ApplyCommandoModifiersArg<T>) => {
  const weapon = { ...weaponInput };
  const { stats } = weapon;

  let hollowPoint = skills.includes("hollow point rounds")
    ? skillModifiers.damage
    : 0;
  let fallback = 0;
  if (weapon.name === "9mm") {
    hollowPoint = 0;
    fallback = skillModifiers["9mm"];
  }
  if (weapon.name === "kfbar") fallback = skillModifiers.knife;

  const damageModifier = passiveModifiers.damage + hollowPoint + fallback;
  const reloadModifier = passiveModifiers.reload;

  const damageValues = ["primaryDamage", "secondaryDamage"] as const;
  damageValues.forEach((type) => {
    stats[type]?.forEach((el) => {
      if (el.type === DamageTypes.ballistic) {
        el.damage += Math.ceil(el.base * damageModifier);
      }
    });
  });

  stats.reload.forEach((damageType) => {
    const normal = damageType.normal;
    normal.dry -= normal.dry * reloadModifier;
    if (normal.half) normal.half -= normal.half * reloadModifier;
    if (damageType.elite) {
      const elite = damageType.elite;
      elite.dry -= elite.dry * reloadModifier;
      if (elite.half) elite.half -= elite.half * reloadModifier;
    }
  });

  if (skillModifiers.magSize || skillModifiers.spareAmmo) {
    const target = { ...stats.ammo };
    stats.ammo = {
      ...target,
      magSize:
        target.magSize + Math.round(target.magSize * skillModifiers.magSize),
      spareAmmo:
        target.spareAmmo +
        Math.round(target.spareAmmo * skillModifiers.spareAmmo),
    };
  }

  if (skillModifiers.weaponSwitch) {
    const target = { ...stats.handling };
    stats.handling = {
      ...target,
      equipTime:
        target.equipTime - target.equipTime * skillModifiers.weaponSwitch,
      putdownTime:
        target.putdownTime - target.putdownTime * skillModifiers.weaponSwitch,
    };
  }

  return weapon;
};
