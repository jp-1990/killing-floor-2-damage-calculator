import { selectWeapons } from "../utils/selectWeapons";
import { assaultRifles } from "../../weapons/assaultRifles";

it("builds expected weapons based on input", () => {
  const weapons = selectWeapons([
    { name: "ak12", upgrade: 0 },
    // { name: "ar15", upgrade: 0 },
    // { name: "bullpup", upgrade: 0 },
  ]);

  expect(weapons[0]).toBeInstanceOf(assaultRifles.ak12);
  // expect(weapons[1]).toBeInstanceOf(assaultRifles.ar15);
  // expect(weapons[2]).toBeInstanceOf(assaultRifles.bullpup);
});

it("builds expected weapons with correct upgrade", () => {
  const weapons = selectWeapons([
    { name: "ak12", upgrade: 0 },
    // { name: "ar15", upgrade: 0 },
    // { name: "bullpup", upgrade: 0 },
  ]);

  expect(weapons[0].upgrade).toBe(0);
  // expect(weapons[1].upgrade).toBe(0);
  // expect(weapons[2].upgrade).toBe(0);
});
