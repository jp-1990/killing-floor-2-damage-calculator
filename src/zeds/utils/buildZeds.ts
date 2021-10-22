import { GameType } from "../../types";
import { zeds } from "../zeds";

/**
 *
 * @param game - object { players, difficulty } used to determine zed health
 * @returns Array of Zeds with health values based on game input
 *
 * @description A function used to build an array of zeds based on the game type options provided
 */
export const buildZeds = (game: GameType) => {
  const zedKeys = (<unknown>Object.keys(zeds)) as (keyof typeof zeds)[];

  const output = zedKeys.map((zed) => {
    return new zeds[zed](game);
  });

  return output;
};
