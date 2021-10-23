import {
  DamageTypes,
  DamageGroups,
  FireMode,
  FireType,
} from "../../../weapons/types";
import { shotsToHitzone } from "../shotsToHitzone";

describe("shotsToHitzone - function", () => {
  const traceZones = (type: DamageGroups) =>
    ![DamageGroups.explosives, DamageGroups.fire].includes(type);

  it("returns the expected values", () => {
    const output = shotsToHitzone({
      zone: { name: "head", modifier: 1.1 },
      health: { head: 1000, body: 3000 },
      bodyModifier: 1,
      resistances: { fire: 0.5, assault_rifle: 0.9 },
      weapon: {
        name: "flamethrower",
        upgrade: 0,
        stats: {
          cost: 1100,
          weight: 7,
          primaryDamage: [
            {
              type: DamageTypes.fire,
              group: DamageGroups.fire,
              damage: 10,
              base: 10,
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
              rate: 600,
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
      },
      fireMode: FireMode.auto,
      fireType: "primaryDamage",
      traceZones,
    });

    expect(output).toHaveProperty("head", 526);
  });
});
