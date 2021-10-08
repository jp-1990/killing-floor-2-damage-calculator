type PerkName =
  | "tactical reload"
  | "high capacity mags"
  | "fallback"
  | "impact rounds"
  | "tenacious"
  | "prepared"
  | "hollow point rounds"
  | "eat lead";

export interface CommandoSkills {
  5?: "tactical reload" | "high capacity mags" | undefined;
  10?: "fallback" | "impact rounds" | undefined;
  15?: "tenacious" | "prepared" | undefined;
  20?: "hollow point rounds" | "eat lead" | undefined;
}

export class Commando {
  level: number;
  perks: CommandoSkills | {};
  stats: {
    [key: string]: number;
  };
  constructor(perkLevel: number, perkConfig: CommandoSkills | {}) {
    this.level = perkLevel;
    this.perks = perkConfig;
    this.stats = this.#stats();
  }
  #stats() {
    const base = this.#baseStats();
    const perk = this.#perkStats() as { [key: string]: number };

    // if key appears in both objects, add
    const output = { ...base } as { [key: string]: number };
    Object.keys(perk).forEach((el) => {
      if (el in output) return (output[el] += perk[el]);
      return (output[el] = perk[el]);
    });
    return output;
  }

  #baseStats() {
    return {
      damageMultiplier: this.level / 100,
      resets: 1 + Math.floor(this.level / 5),
      reloadSpeedIncrease: (Math.floor(this.level / 5) * 2) / 100,
      recoilReduction: (this.level * 2) / 100,
      sightRange: 10 + this.level * 2,
    };
  }

  #perkStats() {
    const perkModifiers = {
      "tactical reload": [{ eliteReload: 1 }],
      "high capacity mags": [{ magSizeIncrease: 0.5 }],
      fallback: [
        { "9mm": 0.85 },
        { knife: 0.85 },
        { weaponSwitchIncrease: 0.5 },
      ],
      "impact rounds": [{ stumblePowerIncrease: 1.5 }],
      tenacious: [{ healthIncrease: 0.25 }, { armourIncrease: 0.25 }],
      prepared: [{ maxAmmoIncrease: 0.2 }],
      "hollow point rounds": [{ damageMultiplier: 0.3 }],
      "eat lead": [{ magSizeIncrease: 1 }],
    };

    let output: { [key: string]: number | undefined } = {};
    const keys = <PerkName[]>Object.values(this.perks);

    // loop over provided keys and get stat values from object
    keys.forEach((key) => {
      const modifiers = perkModifiers[key];
      modifiers.forEach((el) => {
        output = {
          ...output,
          ...el,
        };
      });
    });

    if (keys.includes("high capacity mags") && keys.includes("eat lead")) {
      output.magSizeIncrease =
        perkModifiers["high capacity mags"][0].magSizeIncrease +
        perkModifiers["eat lead"][0].magSizeIncrease;
    }

    return output;
  }
}
