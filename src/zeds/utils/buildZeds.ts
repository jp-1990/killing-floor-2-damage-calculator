import { GameType } from "../../types";
import { zeds } from "../zeds";

export const buildZeds = (game: GameType) => {
  const zedKeys = (<unknown>Object.keys(zeds)) as (keyof typeof zeds)[];

  const output = zedKeys.map((zed) => {
    return new zeds[zed](game);
  });

  return output;
};
