import { GameType } from "../../types";
import { calculateHealth } from "../utils/calculateHealth";

type ZedNames = "scrake" | "fleshpound" | "quarterpounder";

type ValuesType<R, H> = {
  name: ZedNames;
  game: GameType;
  resistances: R;
  hitzones: H;
  penetrationResistance: number;
};

export class Zed<Resistances, Hitzones> {
  name;
  game;
  health;
  resistances;
  hitzones;
  penetrationResistance;
  constructor(values: ValuesType<Resistances, Hitzones>) {
    this.name = values.name;
    this.game = values.game;
    this.resistances = values.resistances;
    this.hitzones = values.hitzones;
    this.penetrationResistance = values.penetrationResistance;
    this.health = this.calcHealth();
  }

  calcHealth() {
    return calculateHealth(this.game.difficulty, this.game.players, this.name);
  }
}
