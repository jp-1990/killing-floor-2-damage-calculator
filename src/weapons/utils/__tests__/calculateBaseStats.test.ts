import { calculateBaseStats } from "../calculateBaseStats";
import { DamageGroups, DamageTypes, FireMode, FireType } from "../../types";

describe("calculateBaseStats - function", () => {
  it("returns basic object based on input stats and upgrade options", () => {
    const calculatedStats = calculateBaseStats(
      {
        cost: 1100,
        weight: 6,
        primaryDamage: [
          {
            type: DamageTypes.ballistic,
            group: DamageGroups.assault_rifle,
            base: 40,
            damage: 40,
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

    expect(calculatedStats).toHaveProperty("weight", 7);
    expect(calculatedStats).toHaveProperty("cost", 1800);
    expect(calculatedStats.primaryDamage[0]).toHaveProperty("damage", 46);
  });

  it("returns object with DoT based on input stats and upgrade options", () => {
    const calculatedStats = calculateBaseStats(
      {
        cost: 1100,
        weight: 7,
        primaryDamage: [
          {
            type: DamageTypes.fire,
            group: DamageGroups.fire,
            damage: 18,
            base: 18,
            penetration: 0,
            DoT: [
              {
                type: DamageTypes.fire,
                group: DamageGroups.fire,
                scale: 0.8,
                duration: 1.7,
                interval: 0.5,
              },
            ],
          },
        ],
        primaryFireRate: [
          {
            type: FireMode.auto,
            rate: 857,
          },
        ],
        reload: [
          {
            type: FireType.primary,
            normal: {
              half: 2.57,
              dry: 2.57,
            },
          },
        ],
        handling: {
          equipTime: 0.3,
          putdownTime: 0.46,
          accuracy: 17,
        },
        ammo: {
          magSize: 100,
          spareAmmo: 500,
        },
      },
      { cost: 0, damageMultiplier: 0, weight: 0 }
    );

    expect(calculatedStats).toHaveProperty("weight", 7);
    expect(calculatedStats).toHaveProperty("cost", 1100);
    expect(calculatedStats.primaryDamage[0]).toHaveProperty("damage", 18);
    expect(calculatedStats.primaryDamage[0]).toHaveProperty("DoT", [
      {
        type: "fire",
        group: "fire",
        scale: 0.8,
        duration: 1.7,
        interval: 0.5,
        damage: 14.4,
      },
    ]);
  });
});
