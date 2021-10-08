import { GameType } from "../../types";
import { Zed } from "../parents";

const quarterpounderResistances = {
  piercing: 0.75,
  slashing: 0.62,
  bludgeon: 0.62,
  toxic: 0.31,
  fire: 0.37,
  hrg_teslauncher_dot: 0.5,
  hrg_teslauncher: 0.5,
  microwave: 1,
  microwaveRifle: 0.8,
  explosives: 1,
  freeze: 1,
  shells: 1,
  bleeding: 1,
  emp: 1,
  submachine: 0.62,
  assault_rifle: 0.62,
  shotgun: 0.75,
  handgun: 0.75,
  rifle: 0.75,
};

const quarterpounderHitzones = {
  head: 1.1,
  chestPlate: 1.1,
  armGrinders: 0.2,
};

type QuarterpounderResistances = typeof quarterpounderResistances;
type QuarterpounderHitzones = typeof quarterpounderHitzones;

export class Quarterpounder extends Zed<
  QuarterpounderResistances,
  QuarterpounderHitzones
> {
  constructor(game: GameType) {
    super({
      name: "quarterpounder",
      game: game,
      resistances: quarterpounderResistances,
      hitzones: quarterpounderHitzones,
      penetrationResistance: 5,
    });
  }
}
