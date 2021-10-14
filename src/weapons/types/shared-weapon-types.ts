import { DamageGroups } from "./damage-groups";
import { DamageTypes } from "./damage-types";

export enum FireType {
  primary = "primary",
  secondary = "secondary",
}

export enum FireMode {
  semi = "semi",
  burst = "burst",
  auto = "auto",
}

export interface DamageModel {
  type: DamageTypes;
  group: DamageGroups;
  damage: number;
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
