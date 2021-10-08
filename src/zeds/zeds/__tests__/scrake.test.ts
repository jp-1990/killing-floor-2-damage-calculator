import { zeds } from "../index";
import { Zed } from "../../parents/zed";

describe("scrake class", () => {
  const scrake = new zeds.scrake({
    players: 1,
    difficulty: "normal",
  });

  test("returns scrake object", () => {
    expect(scrake).toHaveProperty("name", "scrake");
    expect(scrake).toHaveProperty("game");
    expect(scrake).toHaveProperty("resistances");
    expect(scrake).toHaveProperty("hitzones");
    expect(scrake).toHaveProperty("penetrationResistance");
  });
  test("scrake is instance of Zed", () => {
    expect(scrake).toBeInstanceOf(Zed);
  });
  test("scrake is instance of Scrake", () => {
    expect(scrake).toBeInstanceOf(zeds.scrake);
  });
});
