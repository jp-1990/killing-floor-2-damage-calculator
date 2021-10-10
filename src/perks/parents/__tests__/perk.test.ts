import { Perk } from "../perk";
import { DamageGroups, DamageTypes } from "../../../weapons/types";

describe("perk parent class", () => {
  const perk = new Perk({
    name: "commando",
    level: 20,
    skills: {
      5: "high capacity mags",
      10: "fallback",
      15: "prepared",
      20: "hollow point rounds",
    },
    damageGroups: [DamageGroups.assault_rifle],
    damageTypes: [DamageTypes.ballistic],
  });

  test("returns perk object with expected values", () => {
    expect(perk).toHaveProperty("name", "commando");
    expect(perk).toHaveProperty("level", 20);
    expect(perk).toHaveProperty("skills", {
      5: "high capacity mags",
      10: "fallback",
      15: "prepared",
      20: "hollow point rounds",
    });
    expect(perk).toHaveProperty("damageGroups", ["assault_rifle"]);
    expect(perk).toHaveProperty("damageTypes", ["ballistic"]);
  });

  test("returned object is instance of Perk", () => {
    expect(perk).toBeInstanceOf(Perk);
  });
});
