type ScalingHealthInputTuple = [number, number, { [key: string]: number }?];

export interface ScalingHealthInput {
  values: {
    normal: ScalingHealthInputTuple;
    hard: ScalingHealthInputTuple;
    suicidal: ScalingHealthInputTuple;
    hoe: ScalingHealthInputTuple;
  };
  modifiers: {
    body: number;
    head: number;
    [key: string]: number;
  };
}

interface ScalingHealthOutputBodyPart {
  [key: number]: number;
}
interface ScalingHealthOutputDifficulty {
  body: ScalingHealthOutputBodyPart;
  head: ScalingHealthOutputBodyPart;
  [key: string]: ScalingHealthOutputBodyPart;
}
export interface ScalingHealthOutput {
  normal: ScalingHealthOutputDifficulty;
  hard: ScalingHealthOutputDifficulty;
  suicidal: ScalingHealthOutputDifficulty;
  hoe: ScalingHealthOutputDifficulty;
}

export const scalingHealth = (input: ScalingHealthInput) => {
  const { values, modifiers } = input;

  const difficulty = (<unknown>Object.keys(values)) as (keyof typeof values)[];

  const output: ScalingHealthOutput = {
    normal: { body: {}, head: {} },
    hard: { body: {}, head: {} },
    suicidal: { body: {}, head: {} },
    hoe: { body: {}, head: {} },
  };

  difficulty.forEach((el) => {
    const inputTupleLength = values[el].length;
    const inputTupleOther = values[el][2];

    const bodyIncrement = values[el][0] * modifiers.body;
    const headIncrement = values[el][1] * modifiers.head;

    for (let i = 1; i <= 6; i++) {
      const key = i as 1 | 2 | 3 | 4 | 5 | 6;
      output[el].body[key] = Math.floor(
        values[el][0] + bodyIncrement * (key - 1)
      );
      output[el].head[key] = Math.floor(
        values[el][1] + headIncrement * (key - 1)
      );

      if (inputTupleLength === 3 && inputTupleOther !== undefined) {
        const inputObj = values[el][2] as { [key: string]: number };
        const healthZoneNames = Object.keys(inputObj);

        healthZoneNames.forEach((zone) => {
          if (modifiers[zone] !== undefined) {
            const zoneIncrement = inputObj[zone] * modifiers[zone];

            if (!output[el][zone]) {
              output[el] = { ...output[el], [zone]: {} };
            }
            output[el][zone][key] = Math.floor(
              inputObj[zone] + zoneIncrement * (key - 1)
            );
          }
        });
      }
    }
  });
  return output;
};
