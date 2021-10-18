import { Loadout } from "../loadout";
import { Commando } from "../../perks/perks/commando";

describe("loadout class", () => {
  it("returns instance of Loadout", () => {
    const loadout = new Loadout({
      game: {
        players: 6,
        difficulty: "suicidal",
      },
      perk: {
        name: "commando",
        level: 0,
        skills: [],
      },
      weapons: [{ name: "ak12", upgrade: 0 }],
    });

    expect(loadout).toBeInstanceOf(Loadout);
  });

  it("returns object with expected values", () => {
    const loadout = new Loadout({
      game: {
        players: 6,
        difficulty: "suicidal",
      },
      perk: {
        name: "commando",
        level: 20,
        skills: ["high capacity mags", "fallback", "prepared", "eat lead"],
      },
      weapons: [
        { name: "ak12", upgrade: 0 },
        { name: "ak12", upgrade: 2 },
      ],
    });

    expect(loadout).toHaveProperty("game", {
      players: 6,
      difficulty: "suicidal",
    });
    expect(loadout).toHaveProperty(
      "perk",
      new Commando({
        level: 20,
        skills: ["high capacity mags", "fallback", "prepared", "eat lead"],
      })
    );

    expect(loadout).toHaveProperty("weapons", [
      {
        upgrade: 0,
        name: "ak12",
        stats: {
          cost: 1100,
          weight: 6,
          primaryDamage: [
            {
              type: "ballistic",
              group: "assault_rifle",
              damage: 48,
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
              normal: { half: 2.7931199999999996, dry: 2.4545600000000003 },
              elite: { half: 1.9382560000000002, dry: 1.86208 },
            },
          ],
          handling: { equipTime: 0.26, putdownTime: 0.24, accuracy: 67 },
          ammo: { magSize: 75, spareAmmo: 360 },
        },
      },
      {
        upgrade: 2,
        name: "ak12",
        stats: {
          cost: 3300,
          weight: 8,
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
              normal: { half: 2.7931199999999996, dry: 2.4545600000000003 },
              elite: { half: 1.9382560000000002, dry: 1.86208 },
            },
          ],
          handling: { equipTime: 0.26, putdownTime: 0.24, accuracy: 67 },
          ammo: { magSize: 75, spareAmmo: 360 },
        },
      },
    ]);

    expect(loadout).toHaveProperty("zeds");

    console.log(loadout.zeds[0]);
    console.log(loadout.weapons[0].stats);
    loadout.shotsToKill.forEach((el) => {
      console.log(el.name, el.weapons);
    });
  });
});
