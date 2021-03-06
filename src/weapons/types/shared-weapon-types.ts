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

export interface DoTDamageModel {
  type: DamageTypes;
  group: DamageGroups;
  scale: number;
  interval: number;
  duration: number;
  damage?: number;
  stacking?: boolean;
  maxStacks?: number;
}

export interface DamageModel {
  type: DamageTypes;
  group: DamageGroups;
  damage: number;
  base: number;
  penetration?: number;
  DoT?: DoTDamageModel[];
}

export interface ReloadModel {
  type: FireType;
  normal: {
    half?: number;
    dry: number;
  };
  elite?: {
    half?: number;
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

export interface WeaponStatsType {
  cost: number;
  weight: number;

  primaryDamage: DamageModel[];
  primaryFireRate: FireRateModel[];

  secondaryDamage?: DamageModel[];
  secondaryFireRate?: FireRateModel[];

  bashDamage?: DamageModel[];
  bashFireRate?: FireRateModel[];

  reload: ReloadModel[];
  handling: HandlingModel;
  ammo: AmmoModel;
}
