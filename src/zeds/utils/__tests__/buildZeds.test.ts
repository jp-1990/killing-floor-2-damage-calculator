import { GameType } from "../../../types";
import { buildZeds } from "../buildZeds";
import { Fleshpound } from "../../zeds/fleshpound";
import { Quarterpounder } from "../../zeds/quarterpounder";
import { Scrake } from "../../zeds/scrake";

test("returns object containing instances of zeds (only tests fleshpound, quaterpounder and scrake)", () => {
  const game = { players: 1, difficulty: "normal" } as GameType;
  const zedsArray = buildZeds(game);

  expect(zedsArray[0]).toStrictEqual(new Fleshpound(game));
  expect(zedsArray[1]).toStrictEqual(new Quarterpounder(game));
  expect(zedsArray[2]).toStrictEqual(new Scrake(game));
});
