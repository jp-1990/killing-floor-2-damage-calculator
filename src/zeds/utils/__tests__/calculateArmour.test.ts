import { calculateArmour } from "../calculateArmour";

test("returns correct body and head armour of zed based on input", () => {
  expect(calculateArmour("normal", 1, "rioter")).toStrictEqual({
    body: 375,
    head: 337,
  });
  expect(calculateArmour("hoe", 6, "rioter")).toStrictEqual({
    body: 500,
    head: 450,
  });
  expect(calculateArmour("hoe", 6, "scrake")).toStrictEqual({});
});
