import { DamageGroups } from "../types";
import { PerkNames } from "../../perks";

export interface RifleStats {
  baseDamage: number;
  damage: number;
  fullAuto: number | undefined;
  burst: number | undefined;
  semiAuto: number | undefined;
  normalReload: {
    normal: number;
    elite: number;
  };
  dryReload: {
    normal: number;
    elite: number;
  };
  equipTime: number;
  putdownTime: number;
  accuracy: number;
  penetration: number;
  weight: number;
  magSize: number;
  ammo: number;
  price: number;
  dps?: number;
}

export class Rifle {
  damageType: "ballistic";
  damageGroup: DamageGroups.rifle;
  perks: PerkNames[];

  constructor(perks: PerkNames[]) {
    this.damageType = "ballistic";
    this.damageGroup = DamageGroups.rifle;
    this.perks = perks;
  }
}
