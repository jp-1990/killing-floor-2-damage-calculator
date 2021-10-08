import { calculateHealth } from "../calculateHealth";

test("returns correct body and head health of zed based on input", () => {
  expect(calculateHealth("normal", 1, "fleshpound")).toStrictEqual({
    body: 1125,
    head: 487,
  });
  expect(calculateHealth("hoe", 6, "fleshpound")).toStrictEqual({
    body: 5310,
    head: 1716,
  });
});

test("returns correct body, head and other health of zed based on input", () => {
  expect(calculateHealth("normal", 1, "husk")).toStrictEqual({
    backpack: 56,
    body: 346,
    head: 150,
  });
});
