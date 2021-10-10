import { assaultRifles } from "../index";
import { AssaultRifle } from "../../parents/assaultRifle";

describe("ak12 class", () => {
  const ak12 = new assaultRifles.ak12(1);

  test("returns ak12 object", () => {
    expect(ak12).toHaveProperty("name", "ak12");
    expect(ak12).toHaveProperty("upgrade", 1);
    expect(ak12).toHaveProperty("perks");
    expect(ak12).toHaveProperty("stats");

    expect(ak12.stats).toHaveProperty("upgradedWeight", 7);
    expect(ak12.stats).toHaveProperty("upgradedCost", 1800);
    expect(ak12.stats.primaryDamage[0]).toHaveProperty("upgradedDamage", 46);
  });
  test("ak12 is instance of AssaultRifle", () => {
    expect(ak12).toBeInstanceOf(AssaultRifle);
  });
  test("ak12 is instance of AK12", () => {
    expect(ak12).toBeInstanceOf(assaultRifles.ak12);
  });
});
