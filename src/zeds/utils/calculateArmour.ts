import { GameType } from "../../types";
import { fixedHealth } from "./fixedHealth";

const armour = {
  edar: fixedHealth({
    normal: [39, 450],
    hard: [52, 600],
    suicidal: [52, 600],
    hoe: [67, 780],
  }),
  rioter: fixedHealth({
    normal: [375, 337],
    hard: [500, 450],
    suicidal: [500, 450],
    hoe: [500, 450],
  }),
};

type ArmouredZed = keyof typeof armour;
/**
 *
 * @param difficulty - a valid difficulty ("normal" | "hard" | "suicidal" | "hoe")
 * @param players - number of players ( 1-6 )
 * @param zed - name of zed
 * @returns armour values object for the players, difficulty and zed provided
 */
export const calculateArmour = (
  difficulty: GameType["difficulty"],
  players: GameType["players"],
  zed: string
) => {
  const isArmoured = (zed: string | ArmouredZed): zed is ArmouredZed => {
    return armour[zed as ArmouredZed] !== undefined;
  };
  if (!isArmoured(zed)) return {};

  const output: { [key: string]: number } = {};

  output.head = armour[zed][difficulty].head[players];
  output.body = armour[zed][difficulty].body[players];

  const armourZones = Object.keys(armour[zed][difficulty]);

  if (armourZones.length > 2) {
    for (let i = 2, j = armourZones.length; i < j; i++) {
      output[armourZones[i]] = armour[zed][difficulty][armourZones[i]][players];
    }
  }

  return output;
};
