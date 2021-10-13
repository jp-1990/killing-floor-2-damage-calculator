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
        level: 0,
        skills: [],
      },
      weapons: [{ name: "ak12", upgrade: 0 }],
    });
    console.log(loadout);

    expect(loadout).toHaveProperty("game", {
      players: 6,
      difficulty: "suicidal",
    });
    expect(loadout).toHaveProperty(
      "perk",
      new Commando({
        level: 0,
        skills: [],
      })
    );
    expect(loadout).toHaveProperty("weapons");
    expect(loadout).toHaveProperty("zeds");
  });
});
