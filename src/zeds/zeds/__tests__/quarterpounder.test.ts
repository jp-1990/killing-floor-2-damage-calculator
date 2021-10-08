import { zeds } from "../index";
import { Zed } from "../../parents/zed";

describe("quarterpounder class", () => {
  const quarterpounder = new zeds.quarterpounder({
    players: 1,
    difficulty: "normal",
  });

  test("returns quarterpounder object", () => {
    expect(quarterpounder).toHaveProperty("name", "quarterpounder");
    expect(quarterpounder).toHaveProperty("game");
    expect(quarterpounder).toHaveProperty("resistances");
    expect(quarterpounder).toHaveProperty("hitzones");
    expect(quarterpounder).toHaveProperty("penetrationResistance");
  });
  test("quarterpounder is instance of Zed", () => {
    expect(quarterpounder).toBeInstanceOf(Zed);
  });
  test("quarterpounder is instance of Quarterpounder", () => {
    expect(quarterpounder).toBeInstanceOf(zeds.quarterpounder);
  });
});
