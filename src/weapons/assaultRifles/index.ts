import { AK12, AK12UpgradeOptions } from "./ak12";
import { AR15, AR15UpgradeOptions } from "./ar15";
import { Bullpup, BullpupUpgradeOptions } from "./bullpup";
import { FAMAS } from "./famas";
import { HMTech401 } from "./hmtech401";
import { HMTech501 } from "./hmtech501";
import { M16 } from "./m16";
import { Minigun } from "./minigun";
import { Mkb42 } from "./mkb42";
import { SCAR } from "./scar";
import { Stoner } from "./stoner";

export const assaultRifles = {
  ak12: AK12,
  ar15: AR15,
  bullpup: Bullpup,
  // famas: FAMAS,
  // hmtech401: HMTech401,
  // hmtech501: HMTech501,
  // m16: M16,
  // minigun: Minigun,
  // mkb42: Mkb42,
  // scar: SCAR,
  // stoner: Stoner,
};

export interface AssaultRifleUpgradeOptions {
  ak12: AK12UpgradeOptions;
  ar15: AR15UpgradeOptions;
  bullpup: BullpupUpgradeOptions;
  // famas: FAMAS,
  // hmtech401: HMTech401,
  // hmtech501: HMTech501,
  // m16: M16,
  // minigun: Minigun,
  // mkb42: Mkb42,
  // scar: SCAR,
  // stoner: Stoner,
}
