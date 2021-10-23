import { FireMode, DamageGroups, WeaponStatsType } from "../../weapons/types";

interface BasicWeaponType {
  name: string;
  upgrade: number;
  stats: WeaponStatsType;
}
type BasicResistancesType = { [K in DamageGroups]?: number };

interface ShotsToHitzoneArgs<
  W extends BasicWeaponType,
  R extends BasicResistancesType
> {
  zone: {
    name: "body" | "head" | string;
    modifier: number;
  };
  health: {
    [key: string]: number;
  };
  bodyModifier: number;
  resistances: R;
  weapon: W;
  fireType: "primaryDamage" | "secondaryDamage";
  fireMode: FireMode;
  traceZones: (type: DamageGroups) => boolean;
}

/**
 *
 * arg - {@link ShotsToHitzoneArgs}
 * @param zone - target hitzone
 * @param health - the health values for the zed
 * @param bodyModifier - the base body modifier for the zed (usually 1)
 * @param resistances - zed damage resistance object
 * @param weapon - weapon hitting the target zone
 * @param fireType - 'primaryDamage' or 'secondaryDamage'
 * @param fireMode - fire mode of the weapon (semi, auto, burst)
 * @param traceZones - (damageGroup) => boolean. Function indicating whether the supplied damage group can trace hitzones
 * @returns object { [ hitzone ]: number }
 *
 * @description Function to calculate the amount of ammo needed to kill a zed with the weapon provided when all shots land on the target hitzone.
 */
export const shotsToHitzone = <
  W extends BasicWeaponType,
  R extends BasicResistancesType
>({
  zone,
  health,
  bodyModifier,
  resistances,
  weapon,
  fireType,
  fireMode,
  traceZones,
}: ShotsToHitzoneArgs<W, R>) => {
  // target zone
  const target = zone.name;
  const modifier = zone.modifier;

  // get damage values and damage types
  let damage: { damage: number; group: DamageGroups }[] = [];
  weapon.stats[fireType]?.forEach((e) => {
    const base = { damage: e.damage, group: e.group };
    const dots = [];
    const fireRateKey =
      fireType === "primaryDamage" ? "primaryFireRate" : "secondaryFireRate";

    if (!traceZones(e.group)) {
      base.damage *= bodyModifier;
    } else {
      base.damage *= modifier;
    }

    const DoTInput = e.DoT;
    const fireRate = weapon.stats[fireRateKey];
    if (DoTInput && fireRate) {
      // calc damage per shot per dot
      const dotDamage = DoTInput.map((dot) => {
        const mode = fireRate.find((el) => el.type === fireMode);
        return {
          // ((ticks * damage) * ( 1 / duration)) / shots per second * modifier
          damage:
            ((Math.floor(dot.duration / dot.interval) *
              (e.damage * dot.scale) *
              (1 / dot.duration)) /
              ((mode?.rate || 60) / 60)) *
            (!traceZones(e.group) ? bodyModifier : modifier),
          group: dot.group,
        };
      });
      // add to base
      dots.push(...dotDamage);
    }

    // apply resistance
    const output = [base, ...dots].map((el) => {
      let value = el.damage;
      const resistance = resistances[el.group];
      if (resistance) value *= resistance;
      return {
        ...el,
        damage: value,
      };
    });

    damage.push(...output);
  });

  let bodyDamage = 0;
  let headDamage = 0;
  let counter = 0;

  // loop while damage < health
  while (bodyDamage < health.body && headDamage < health.head) {
    damage.forEach((el) => {
      // if target = head, apply modified damage to head and body health
      if (target === "head" && traceZones(el.group)) headDamage += el.damage;

      // if damage type cant hit head, apply to body
      bodyDamage += el.damage;
    });

    counter++;
  }

  return { [zone.name]: counter };
};
