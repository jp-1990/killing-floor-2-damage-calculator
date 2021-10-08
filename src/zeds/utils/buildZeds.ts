import { GameType } from "../../types";
import { zeds, ZedType } from "../zeds";

export const buildZeds = (game: GameType) => {
  const zedKeys = (<unknown>Object.keys(zeds)) as (keyof typeof zeds)[];
  const output: { [key: string]: ZedType } = {};

  zedKeys.forEach((zed) => {
    const key = zed as string;
    output[key] = new zeds[zed](game);
  });

  return output;
};
