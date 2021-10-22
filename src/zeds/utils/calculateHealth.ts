import { GameType } from "../../types";
import { fixedHealth } from "./fixedHealth";
import { scalingHealth } from "./scalingHealth";

const health = {
  // abomination: {
  //   normal: healthValues(5850, 0.4, 5850, 0.4),
  //   hard: healthValues(7200, 0.4, 7200, 0.4),
  //   suicidal: healthValues(8100, 0.4, 8100, 0.4),
  //   hoe: healthValues(9450, 0.4, 9450, 0.4),
  // },
  alphaclot: fixedHealth({
    normal: [75, 15],
    hard: [100, 20],
    suicidal: [100, 20],
    hoe: [100, 20],
  }),
  bloat: fixedHealth({
    normal: [303, 56],
    hard: [405, 75],
    suicidal: [486, 78],
    hoe: [526, 82],
  }),
  crawler: fixedHealth({
    normal: [41, 15],
    hard: [55, 20],
    suicidal: [55, 20],
    hoe: [55, 20],
  }),
  cyst: fixedHealth({
    normal: [75, 15],
    hard: [100, 20],
    suicidal: [100, 20],
    hoe: [100, 20],
  }),
  edar: fixedHealth({
    normal: [581, 262, { core: 150 }],
    hard: [775, 350, { core: 150 }],
    suicidal: [775, 350, { core: 150 }],
    hoe: [1007, 385, { core: 150 }],
  }),
  fleshpound: scalingHealth({
    values: {
      normal: [1125, 487],
      hard: [1500, 650],
      suicidal: [1650, 682],
      hoe: [1800, 715],
    },
    modifiers: {
      body: 0.39,
      head: 0.28,
    },
  }),
  gorefast: fixedHealth({
    normal: [150, 37],
    hard: [200, 50],
    suicidal: [200, 50],
    hoe: [200, 50],
  }),
  gorefiend: fixedHealth({
    normal: [300, 110],
    hard: [400, 150],
    suicidal: [400, 150],
    hoe: [400, 150],
  }),
  // hans: {
  //   normal: healthValues(5268, 0.75, 5268, 0.75),
  //   hard: healthValues(6084, 0.75, 3750, 0.5),
  //   suicidal: healthValues(6307, 0.75, 4237, 0.5),
  //   hoe: healthValues(8013, 0.75, 5212, 0.5),
  // },
  husk: fixedHealth({
    normal: [346, 150, { backpack: 56 }],
    hard: [462, 200, { backpack: 75 }],
    suicidal: [462, 200, { backpack: 75 }],
    hoe: [600, 220, { backpack: 75 }],
  }),
  // matriarch: {
  //   normal: healthValues(4900, 0.5, 4900, 0.5),
  //   hard: healthValues(6300, 0.5, 6300, 0.5),
  //   suicidal: healthValues(7000, 0.5, 7000, 0.5),
  //   hoe: healthValues(8400, 0.5, 8400, 0.5),
  // },
  // kingfleshpound: {
  //   normal: healthValues(5512, 0.39, 5512, 0.39),
  //   hard: healthValues(7262, 0.39, 7262, 0.39),
  //   suicidal: healthValues(8750, 0.39, 8750, 0.39),
  //   hoe: healthValues(10500, 0.39, 10500, 0.39),
  // },
  // patriarch: {
  //   normal: healthValues(2812, 0.5, 2812, 0.5),
  //   hard: healthValues(3750, 0.5, 3750, 0.5),
  //   suicidal: healthValues(4237, 0.5, 4237, 0.5),
  //   hoe: healthValues(5212, 0.5, 5212, 0.5),
  // },
  quarterpounder: scalingHealth({
    values: {
      normal: [375, 325],
      hard: [562, 487],
      suicidal: [825, 682],
      hoe: [862, 702],
    },
    modifiers: {
      body: 0.2,
      head: 0.15,
    },
  }),
  rioter: fixedHealth({
    normal: [225, 93],
    hard: [300, 125],
    suicidal: [300, 125],
    hoe: [300, 125],
  }),
  scrake: scalingHealth({
    values: {
      normal: [935, 510],
      hard: [1100, 600],
      suicidal: [1210, 630],
      hoe: [1210, 660],
    },
    modifiers: {
      body: 0.39,
      head: 0.28,
    },
  }),
  siren: fixedHealth({
    normal: [230, 150],
    hard: [230, 150],
    suicidal: [230, 150],
    hoe: [230, 150],
  }),
  slasher: fixedHealth({
    normal: [75, 15],
    hard: [100, 20],
    suicidal: [100, 20],
    hoe: [100, 20],
  }),
  stalker: fixedHealth({
    normal: [56, 15],
    hard: [75, 20],
    suicidal: [75, 20],
    hoe: [75, 20],
  }),
};

/**
 *
 * @param difficulty - a valid difficulty ("normal" | "hard" | "suicidal" | "hoe")
 * @param players - number of players ( 1-6 )
 * @param zed - name of zed
 * @returns health values object for the players, difficulty and zed provided
 */
export const calculateHealth = (
  difficulty: GameType["difficulty"],
  players: GameType["players"],
  zed: keyof typeof health
) => {
  const output: { [key: string]: number } = {};

  output.head = health[zed][difficulty].head[players];
  output.body = health[zed][difficulty].body[players];

  const healthZones = Object.keys(health[zed][difficulty]);

  if (healthZones.length > 2) {
    for (let i = 2, j = healthZones.length; i < j; i++) {
      output[healthZones[i]] = health[zed][difficulty][healthZones[i]][players];
    }
  }

  return output;
};
