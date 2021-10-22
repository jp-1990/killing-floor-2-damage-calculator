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

/**
 * @param values - {@link ValuesType}
 * @param values.name - a valid zed name
 * @param values.game - object { players, difficulty } (used to calculate zed health)
 * @param values.resistances - damage resistance values for this zed
 * @param values.hitzones - damage hitzones and modifiers for this zed
 * @param values.penetrationResistance - zed resistance to weapon penetration
 *
 * @description zed parent class. Contains method for calculating zed health values.
 */
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
