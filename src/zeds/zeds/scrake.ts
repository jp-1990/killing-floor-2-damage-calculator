import { GameType } from "../../types";
import { Zed } from "../parents";

const scrakeResistances = {
  piercing: 0.75,
  slashing: 1,
  bludgeon: 1,
  toxic: 0.25,
  fire: 0.3,
  hrg_teslauncher_dot: 0.6,
  hrg_teslauncher: 0.6,
  microwave: 1.1,
  explosives: 0.4,
  rpg7_impact: 4,
  freeze: 1,
  shells: 1,
  bleeding: 1,
  emp: 1,
  submachine: 1,
  assault_rifle: 1,
  shotgun: 0.9,
  handgun: 0.8,
  rifle: 1,
  ballistic_hemogoblin: 0.75,
};

const scrakeHitzones = [
  { name: "head", modifier: 1.1 },
  { name: "body", modifier: 1 },
  { name: "chainsaw", modifier: 0.2 },
];

type ScrakeResistances = typeof scrakeResistances;
type ScrakeHitzones = typeof scrakeHitzones;

export class Scrake extends Zed<ScrakeResistances, ScrakeHitzones> {
  constructor(game: GameType) {
    super({
      name: "scrake",
      game: game,
      resistances: scrakeResistances,
      hitzones: scrakeHitzones,
      penetrationResistance: 4,
    });
  }
}
