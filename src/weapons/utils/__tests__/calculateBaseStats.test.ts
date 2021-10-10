import { calculateBaseStats } from "../calculateBaseStats";
import { DamageGroups, DamageTypes, FireMode, FireType } from "../../types";

it("returns expected object based on input stats and upgrade options", () => {
  const calculatedStats = calculateBaseStats(
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

  expect(calculatedStats).toHaveProperty("upgradedWeight", 7);
  expect(calculatedStats).toHaveProperty("upgradedCost", 1800);
  expect(calculatedStats.primaryDamage[0]).toHaveProperty("upgradedDamage", 46);
});
