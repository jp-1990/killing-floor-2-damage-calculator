import { scalingHealth, ScalingHealthInput } from "../scalingHealth";

test("returns object with health values for body, head for normal, hard, suicidal and hoe", () => {
  const values = {
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
  } as ScalingHealthInput;

  expect(scalingHealth(values)).toStrictEqual({
    normal: {
      body: {
        "1": 1125,
        "2": 1563,
        "3": 2002,
        "4": 2441,
        "5": 2880,
        "6": 3318,
      },
      head: { "1": 487, "2": 623, "3": 759, "4": 896, "5": 1032, "6": 1168 },
    },
    hard: {
      body: {
        "1": 1500,
        "2": 2085,
        "3": 2670,
        "4": 3255,
        "5": 3840,
        "6": 4425,
      },
      head: { "1": 650, "2": 832, "3": 1014, "4": 1196, "5": 1378, "6": 1560 },
    },
    suicidal: {
      body: {
        "1": 1650,
        "2": 2293,
        "3": 2937,
        "4": 3580,
        "5": 4224,
        "6": 4867,
      },
      head: { "1": 682, "2": 872, "3": 1063, "4": 1254, "5": 1445, "6": 1636 },
    },
    hoe: {
      body: {
        "1": 1800,
        "2": 2502,
        "3": 3204,
        "4": 3906,
        "5": 4608,
        "6": 5310,
      },
      head: { "1": 715, "2": 915, "3": 1115, "4": 1315, "5": 1515, "6": 1716 },
    },
  });
});

test("returns object with health values for body, head and 'other' for normal, hard, suicidal and hoe when a modifier is provided", () => {
  const values = {
    values: {
      normal: [1125, 487, { shield: 100 }],
      hard: [1500, 650, { shield: 200 }],
      suicidal: [1650, 682, { shield: 300 }],
      hoe: [1800, 715, { shield: 400 }],
    },
    modifiers: {
      body: 0.39,
      head: 0.28,
      shield: 0.1,
    },
  } as ScalingHealthInput;

  expect(scalingHealth(values)).toStrictEqual({
    normal: {
      body: {
        "1": 1125,
        "2": 1563,
        "3": 2002,
        "4": 2441,
        "5": 2880,
        "6": 3318,
      },
      head: { "1": 487, "2": 623, "3": 759, "4": 896, "5": 1032, "6": 1168 },
      shield: { 1: 100, 2: 110, 3: 120, 4: 130, 5: 140, 6: 150 },
    },
    hard: {
      body: {
        "1": 1500,
        "2": 2085,
        "3": 2670,
        "4": 3255,
        "5": 3840,
        "6": 4425,
      },
      head: { "1": 650, "2": 832, "3": 1014, "4": 1196, "5": 1378, "6": 1560 },
      shield: { 1: 200, 2: 220, 3: 240, 4: 260, 5: 280, 6: 300 },
    },
    suicidal: {
      body: {
        "1": 1650,
        "2": 2293,
        "3": 2937,
        "4": 3580,
        "5": 4224,
        "6": 4867,
      },
      head: { "1": 682, "2": 872, "3": 1063, "4": 1254, "5": 1445, "6": 1636 },
      shield: { 1: 300, 2: 330, 3: 360, 4: 390, 5: 420, 6: 450 },
    },
    hoe: {
      body: {
        "1": 1800,
        "2": 2502,
        "3": 3204,
        "4": 3906,
        "5": 4608,
        "6": 5310,
      },
      head: { "1": 715, "2": 915, "3": 1115, "4": 1315, "5": 1515, "6": 1716 },
      shield: { 1: 400, 2: 440, 3: 480, 4: 520, 5: 560, 6: 600 },
    },
  });
});

test("returns object with health values for body, head for normal, hard, suicidal and hoe when 'other' is provided but a modifier is not", () => {
  const values = {
    values: {
      normal: [1125, 487, { shield: 100 }],
      hard: [1500, 650, { shield: 200 }],
      suicidal: [1650, 682, { shield: 300 }],
      hoe: [1800, 715, { shield: 400 }],
    },
    modifiers: {
      body: 0.39,
      head: 0.28,
    },
  } as ScalingHealthInput;

  expect(scalingHealth(values)).toStrictEqual({
    normal: {
      body: {
        "1": 1125,
        "2": 1563,
        "3": 2002,
        "4": 2441,
        "5": 2880,
        "6": 3318,
      },
      head: { "1": 487, "2": 623, "3": 759, "4": 896, "5": 1032, "6": 1168 },
    },
    hard: {
      body: {
        "1": 1500,
        "2": 2085,
        "3": 2670,
        "4": 3255,
        "5": 3840,
        "6": 4425,
      },
      head: { "1": 650, "2": 832, "3": 1014, "4": 1196, "5": 1378, "6": 1560 },
    },
    suicidal: {
      body: {
        "1": 1650,
        "2": 2293,
        "3": 2937,
        "4": 3580,
        "5": 4224,
        "6": 4867,
      },
      head: { "1": 682, "2": 872, "3": 1063, "4": 1254, "5": 1445, "6": 1636 },
    },
    hoe: {
      body: {
        "1": 1800,
        "2": 2502,
        "3": 3204,
        "4": 3906,
        "5": 4608,
        "6": 5310,
      },
      head: { "1": 715, "2": 915, "3": 1115, "4": 1315, "5": 1515, "6": 1716 },
    },
  });
});
