import { AssaultRifle } from "../assaultRifle";
import { FireMode, FireType, DamageGroups, DamageTypes } from "../../types";

describe("assault rifle parent class", () => {
  const assaultRifle = new AssaultRifle(
    ["commando"],
    {
      baseCost: 1100,
      baseWeight: 6,
      primaryDamage: [
        {
          type: DamageTypes.ballistic,
          group: DamageGroups.assault_rifle,
          baseDamage: 40,
          penetration: 0,
        },
      ],
      primaryFireRate: [
        {
          type: FireMode.auto,
          rate: 600,
        },
        {
          type: FireMode.burst,
          rate: 1000,
        },
      ],
      reload: [
        {
          type: FireType.primary,
          normal: {
            half: 3.3,
            dry: 2.9,
          },
          elite: {
            half: 2.29,
            dry: 2.2,
          },
        },
      ],
      handling: {
        equipTime: 0.52,
        putdownTime: 0.48,
        accuracy: 67,
      },
      ammo: {
        magSize: 30,
        spareAmmo: 300,
      },
    },
    { cost: 700, damageMultiplier: 0.15, weight: 1 }
  );

  test("returns assault rifle object with expected values", () => {
    expect(assaultRifle).toHaveProperty("perks");
    expect(assaultRifle).toHaveProperty("stats");

    expect(assaultRifle.stats).toHaveProperty("upgradedWeight", 7);
    expect(assaultRifle.stats).toHaveProperty("upgradedCost", 1800);
    expect(assaultRifle.stats.primaryDamage[0]).toHaveProperty(
      "upgradedDamage",
      46
    );
  });
  test("object is instance of AssaultRifle", () => {
    expect(assaultRifle).toBeInstanceOf(AssaultRifle);
  });
});
