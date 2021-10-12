import { Commando } from "../commando";

describe("commando class", () => {
  const commando = new Commando({
    level: 20,
    skills: [
      "high capacity mags",
      "fallback",
      "prepared",
      "hollow point rounds",
    ],
  });
  it("returns instance of Commando", () => {
    expect(commando).toBeInstanceOf(Commando);
  });

  test("returns perk object with expected base values", () => {
    expect(commando).toHaveProperty("name", "commando");
    expect(commando).toHaveProperty("level", 20);
    expect(commando).toHaveProperty("skills", [
      "high capacity mags",
      "fallback",
      "prepared",
      "hollow point rounds",
    ]);
    expect(commando).toHaveProperty("damageGroups", ["assault_rifle"]);
    expect(commando).toHaveProperty("damageTypes", ["ballistic"]);
    expect(commando).toHaveProperty("perkWeapons", [
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
    ]);
  });

  test("returns perk object with expected calculated values", () => {
    expect(commando).toHaveProperty("passiveModifiers", {
      damageMultiplier: 0.2,
      resets: 5,
      reloadSpeedIncrease: 0.08,
      recoilReduction: 0.4,
      sightRange: 50,
    });
    expect(commando).toHaveProperty("skillModifiers", {
      magSizeIncrease: 0.5,
      "9mm": 0.85,
      knife: 0.85,
      weaponSwitchIncrease: 0.5,
      maxAmmoIncrease: 0.2,
      damageMultiplier: 0.3,
    });
  });
});
