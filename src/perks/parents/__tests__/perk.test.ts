import { Perk } from "../perk";
import { DamageGroups, DamageTypes } from "../../../weapons/types";

describe("perk parent class", () => {
  const perk = new Perk({
    name: "commando",
    level: 20,
    skills: [
      "high capacity mags",
      "fallback",
      "prepared",
      "hollow point rounds",
    ],
    damageGroups: [DamageGroups.assault_rifle],
    damageTypes: [DamageTypes.ballistic],
    perkWeapons: ["ak12", "ar15"],
  });

  test("returns perk object with expected values", () => {
    expect(perk).toHaveProperty("name", "commando");
    expect(perk).toHaveProperty("level", 20);
    expect(perk).toHaveProperty("skills", [
      "high capacity mags",
      "fallback",
      "prepared",
      "hollow point rounds",
    ]);
    expect(perk).toHaveProperty("damageGroups", ["assault_rifle"]);
    expect(perk).toHaveProperty("damageTypes", ["ballistic"]);
    expect(perk).toHaveProperty("perkWeapons", ["ak12", "ar15"]);
  });

  test("returned object is instance of Perk", () => {
    expect(perk).toBeInstanceOf(Perk);
  });
});
