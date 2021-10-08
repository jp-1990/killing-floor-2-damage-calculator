import { buildPerk, PlayerPerk, PerkName } from "../../perks";

export const selectPerk = <Perk extends PerkName>(perk: PlayerPerk<Perk>) => {
  return buildPerk(perk);
};
