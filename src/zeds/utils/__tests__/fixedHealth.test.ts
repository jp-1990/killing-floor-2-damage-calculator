import { fixedHealth, FixedHealthInput } from "../fixedHealth";

test("returns object with health values for body, head for normal, hard, suicidal and hoe", () => {
  const values = {
    normal: [303, 56],
    hard: [405, 75],
    suicidal: [486, 78],
    hoe: [526, 82],
  } as FixedHealthInput;

  expect(fixedHealth(values)).toStrictEqual({
    normal: {
      body: { 1: 303, 2: 303, 3: 303, 4: 303, 5: 303, 6: 303 },
      head: { 1: 56, 2: 56, 3: 56, 4: 56, 5: 56, 6: 56 },
    },
    hard: {
      body: { 1: 405, 2: 405, 3: 405, 4: 405, 5: 405, 6: 405 },
      head: { 1: 75, 2: 75, 3: 75, 4: 75, 5: 75, 6: 75 },
    },
    suicidal: {
      body: { 1: 486, 2: 486, 3: 486, 4: 486, 5: 486, 6: 486 },
      head: { 1: 78, 2: 78, 3: 78, 4: 78, 5: 78, 6: 78 },
    },
    hoe: {
      body: { 1: 526, 2: 526, 3: 526, 4: 526, 5: 526, 6: 526 },
      head: { 1: 82, 2: 82, 3: 82, 4: 82, 5: 82, 6: 82 },
    },
  });
});

test("returns object with health values for body, head and 'other' for normal, hard, suicidal and hoe", () => {
  const values = {
    normal: [346, 150, { backpack: 56 }],
    hard: [462, 200, { backpack: 75 }],
    suicidal: [462, 200, { backpack: 75 }],
    hoe: [600, 220, { backpack: 86 }],
  } as FixedHealthInput;

  expect(fixedHealth(values)).toStrictEqual({
    normal: {
      body: { 1: 346, 2: 346, 3: 346, 4: 346, 5: 346, 6: 346 },
      head: { 1: 150, 2: 150, 3: 150, 4: 150, 5: 150, 6: 150 },
      backpack: { 1: 56, 2: 56, 3: 56, 4: 56, 5: 56, 6: 56 },
    },
    hard: {
      body: { 1: 462, 2: 462, 3: 462, 4: 462, 5: 462, 6: 462 },
      head: { 1: 200, 2: 200, 3: 200, 4: 200, 5: 200, 6: 200 },
      backpack: { 1: 75, 2: 75, 3: 75, 4: 75, 5: 75, 6: 75 },
    },
    suicidal: {
      body: { 1: 462, 2: 462, 3: 462, 4: 462, 5: 462, 6: 462 },
      head: { 1: 200, 2: 200, 3: 200, 4: 200, 5: 200, 6: 200 },
      backpack: { 1: 75, 2: 75, 3: 75, 4: 75, 5: 75, 6: 75 },
    },
    hoe: {
      body: { 1: 600, 2: 600, 3: 600, 4: 600, 5: 600, 6: 600 },
      head: { 1: 220, 2: 220, 3: 220, 4: 220, 5: 220, 6: 220 },
      backpack: { 1: 86, 2: 86, 3: 86, 4: 86, 5: 86, 6: 86 },
    },
  });
});
