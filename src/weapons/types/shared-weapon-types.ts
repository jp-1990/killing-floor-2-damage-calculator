import { DamageGroups } from "./damage-groups";
import { DamageTypes } from "./damage-types";
import { FireMode } from "./fire-mode";

export enum FireType {
  primary = "primary",
  secondary = "secondary",
}

export interface DamageModel {
  type: DamageTypes;
  group: DamageGroups;
  baseDamage: number;
  upgradedDamage?: number;
  penetration?: number;
  DoT?: {
    interval: number;
    duration: number;
    stacking?: boolean;
    maxStacks?: number;
  };
}

export interface ReloadModel {
  type: FireType;
  normal: {
    half: number;
    dry: number;
  };
  elite?: {
    half: number;
    dry: number;
  };
}

export interface HandlingModel {
  equipTime: number;
  putdownTime: number;
  accuracy: number;
}

export interface FireRateModel {
  type: FireMode;
  rate: number;
}

export interface AmmoModel {
  magSize: number;
  spareAmmo: number;
}
