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
      damage: 0.2,
      resets: 5,
      reload: 0.08,
      recoil: 0.4,
      sightRange: 50,
    });
    expect(commando).toHaveProperty("skillModifiers", {
      magSize: 0.5,
      "9mm": 0.85,
      knife: 0.85,
      weaponSwitch: 0.5,
      spareAmmo: 0.2,
      damage: 0.3,
    });
  });
});
