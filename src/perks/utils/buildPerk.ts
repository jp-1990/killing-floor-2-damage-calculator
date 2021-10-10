import { Commando } from "../commando";
import { PlayerPerk, PerkName } from "../types";

const perks = {
  commando: Commando,
};

export const buildPerk = (perk: PlayerPerk<PerkName>) => {
  return new perks[perk.perk](perk.level, perk.skills);
};
