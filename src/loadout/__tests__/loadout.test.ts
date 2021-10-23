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

  it("returns object with expected properties", () => {
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
        { name: "rpg7", upgrade: 0 },
        { name: "flamethrower", upgrade: 0 },
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

    expect(loadout).toHaveProperty("weapons");
    expect(loadout).toHaveProperty("zeds");
    expect(loadout).toHaveProperty("shotsToKill");
  });
});
