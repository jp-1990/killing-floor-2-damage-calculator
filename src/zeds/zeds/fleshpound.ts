import { GameType } from "../../types";
import { Zed } from "../parents";

const fleshpoundResistances = {
  piercing: 0.75,
  slashing: 0.5,
  bludgeon: 0.6,
  toxic: 0.25,
  fire: 0.3,
  hrg_teslauncher_dot: 0.5,
  hrg_teslauncher: 0.5,
  microwave: 1,
  microwaveRifle: 0.8,
  explosives: 1.5,
  freeze: 1,
  shells: 1,
  bleeding: 1,
  emp: 1,
  submachine: 0.5,
  assault_rifle: 0.5,
  shotgun: 0.75,
  handgun: 0.75,
  rifle: 0.75,
};

const fleshpoundHitzones = [
  { name: "head", modifier: 1.1 },
  { name: "body", modifier: 1 },
  { name: "chestPlate", modifier: 1.1 },
  { name: "armGrinders", modifier: 0.2 },
];

type FleshpoundResistances = typeof fleshpoundResistances;
type FleshpoundHitzones = typeof fleshpoundHitzones;

export class Fleshpound extends Zed<FleshpoundResistances, FleshpoundHitzones> {
  constructor(game: GameType) {
    super({
      name: "fleshpound",
      game: game,
      resistances: fleshpoundResistances,
      hitzones: fleshpoundHitzones,
      penetrationResistance: 5,
    });
  }
}
