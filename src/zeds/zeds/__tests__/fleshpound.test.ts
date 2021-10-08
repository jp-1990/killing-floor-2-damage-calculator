import { zeds } from "../index";
import { Zed } from "../../parents/zed";

describe("fleshpound class", () => {
  const fleshpound = new zeds.fleshpound({
    players: 1,
    difficulty: "normal",
  });

  test("returns fleshpound object", () => {
    expect(fleshpound).toHaveProperty("name", "fleshpound");
    expect(fleshpound).toHaveProperty("game");
    expect(fleshpound).toHaveProperty("resistances");
    expect(fleshpound).toHaveProperty("hitzones");
    expect(fleshpound).toHaveProperty("penetrationResistance");
  });
  test("fleshpound is instance of Zed", () => {
    expect(fleshpound).toBeInstanceOf(Zed);
  });
  test("fleshpound is instance of Fleshpound", () => {
    expect(fleshpound).toBeInstanceOf(zeds.fleshpound);
  });
});
