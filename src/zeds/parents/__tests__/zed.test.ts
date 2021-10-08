import { Zed } from "../zed";

describe("zed parent class", () => {
  const fleshpound = new Zed({
    name: "fleshpound",
    game: { players: 1, difficulty: "normal" },
    resistances: { ballistic: 0.5 },
    hitzones: { head: 1.1 },
    penetrationResistance: 5,
  });
  test("returns zed object", () => {
    expect(fleshpound).toHaveProperty("name", "fleshpound");
    expect(fleshpound).toHaveProperty("game", {
      players: 1,
      difficulty: "normal",
    });
    expect(fleshpound).toHaveProperty("resistances", { ballistic: 0.5 });
    expect(fleshpound).toHaveProperty("hitzones", { head: 1.1 });
    expect(fleshpound).toHaveProperty("penetrationResistance", 5);
  });
  test("zed is instance of Zed", () => {
    expect(fleshpound).toBeInstanceOf(Zed);
  });
});
