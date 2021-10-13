import { FNFAL } from "./fnfal";

export const rifles = {
  fnfal: FNFAL,
};

type FNFALUpgradeOptions = 0 | 1;

export interface RifleUpgradeOptions {
  fnfal: FNFALUpgradeOptions;
}
