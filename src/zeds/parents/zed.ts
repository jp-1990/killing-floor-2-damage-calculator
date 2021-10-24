import { GameType } from "../../types";
import { calculateArmour } from "../utils/calculateArmour";
import { calculateHealth } from "../utils/calculateHealth";
import { calculateResistances } from "../utils/calculateResistances";

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
 * @description zed parent class
 */
export class Zed<Resistances, Hitzones> {
  name;
  game;
  health;
  armour;
  resistances;
  hitzones;
  penetrationResistance;
  constructor(values: ValuesType<Resistances, Hitzones>) {
    this.name = values.name;
    this.game = values.game;
    this.resistances = calculateResistances(
      values.resistances,
      values.game.players
    );
    this.hitzones = values.hitzones;
    this.penetrationResistance = values.penetrationResistance;
    this.health = calculateHealth(
      values.game.difficulty,
      values.game.players,
      values.name
    );
    this.armour = calculateArmour(
      values.game.difficulty,
      values.game.players,
      values.name
    );
  }
}
