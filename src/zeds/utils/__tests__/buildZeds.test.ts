import { GameType } from "../../../types";
import { buildZeds } from "../buildZeds";
import { Fleshpound } from "../../zeds/fleshpound";
import { Quarterpounder } from "../../zeds/quarterpounder";
import { Scrake } from "../../zeds/scrake";

test("returns object containing instances of zeds (only tests fleshpound, quaterpounder and scrake)", () => {
  const game = { players: 1, difficulty: "normal" } as GameType;
  const zedsObject = buildZeds(game);

  expect(zedsObject).toHaveProperty("fleshpound", new Fleshpound(game));
  expect(zedsObject).toHaveProperty("quarterpounder", new Quarterpounder(game));
  expect(zedsObject).toHaveProperty("scrake", new Scrake(game));
});
