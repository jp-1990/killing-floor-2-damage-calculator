import { applyModifiers } from "../index";
import {
  DamageTypes,
  DamageGroups,
  FireMode,
  FireType,
} from "../../../weapons/types";

describe("apply modifiers function", () => {
  it("applies the correct modifier based on input", () => {
    const modifiedWeapon = applyModifiers({
      name: "commando",
      skillModifiers: {
        magSize: 0.5,
        "9mm": 0.85,
        knife: 0.85,
        weaponSwitch: 0.5,
        spareAmmo: 0.2,
        damage: 0.3,
      },
      passiveModifiers: {
        damage: 0.2,
        resets: 5,
        reload: 0.08,
        recoil: 0.4,
        sightRange: 50,
      },
      skills: [
        "high capacity mags",
        "fallback",
        "prepared",
        "hollow point rounds",
      ],
      weaponInput: {
        upgrade: 0,
        name: "ak12",
        stats: {
          cost: 1100,
          weight: 6,
          primaryDamage: [
            {
              type: DamageTypes.ballistic,
              group: DamageGroups.assault_rifle,
              damage: 40,
              base: 40,
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
      },
    });

    expect(modifiedWeapon).toHaveProperty("stats", {
      cost: 1100,
      weight: 6,
      primaryDamage: [
        {
          type: "ballistic",
          group: "assault_rifle",
          damage: 60,
          base: 40,
          penetration: 0,
        },
      ],
      primaryFireRate: [
        { type: "auto", rate: 600 },
        { type: "burst", rate: 1000 },
      ],
      reload: [
        {
          type: "primary",
          normal: { half: 3.0359999999999996, dry: 2.668 },
          elite: { half: 2.1068000000000002, dry: 2.024 },
        },
      ],
      handling: { equipTime: 0.26, putdownTime: 0.24, accuracy: 67 },
      ammo: { magSize: 45, spareAmmo: 360 },
    });
  });
});
