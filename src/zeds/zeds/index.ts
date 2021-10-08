import { Fleshpound } from "./fleshpound";
import { Quarterpounder } from "./quarterpounder";
import { Scrake } from "./scrake";

export type ZedType = Fleshpound | Scrake | Quarterpounder;

export const zeds = {
  fleshpound: Fleshpound,
  quarterpounder: Quarterpounder,
  scrake: Scrake,
};
