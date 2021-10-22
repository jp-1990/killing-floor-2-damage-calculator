type FixedHealthInputTuple = [number, number, { [key: string]: number }?];

export interface FixedHealthInput {
  normal: FixedHealthInputTuple;
  hard: FixedHealthInputTuple;
  suicidal: FixedHealthInputTuple;
  hoe: FixedHealthInputTuple;
}

interface FixedHealthOutputBodyPart {
  [key: number]: number;
}
interface FixedHealthOutputDifficulty {
  body: FixedHealthOutputBodyPart;
  head: FixedHealthOutputBodyPart;
  [key: string]: FixedHealthOutputBodyPart;
}
export interface FixedHealthOutput {
  normal: FixedHealthOutputDifficulty;
  hard: FixedHealthOutputDifficulty;
  suicidal: FixedHealthOutputDifficulty;
  hoe: FixedHealthOutputDifficulty;
}

/**
 *
 * @param values - {@link FixedHealthInput}
 * @returns calculated health values
 *
 * @description Function to calculate health values for zeds where health does not scale based on the number of players in a game.
 */
export const fixedHealth = (values: FixedHealthInput) => {
  const difficulty = (<unknown>Object.keys(values)) as (keyof typeof values)[];

  const output: FixedHealthOutput = {
    normal: { body: {}, head: {} },
    hard: { body: {}, head: {} },
    suicidal: { body: {}, head: {} },
    hoe: { body: {}, head: {} },
  };

  difficulty.forEach((el) => {
    for (let i = 1; i <= 6; i++) {
      const key = i as 1 | 2 | 3 | 4 | 5 | 6;
      output[el].body[key] = Math.floor(values[el][0]);
      output[el].head[key] = Math.floor(values[el][1]);

      if (values[el].length === 3 && values[el][2] !== undefined) {
        const inputObj = values[el][2] as { [key: string]: number };
        const healthZoneNames = Object.keys(inputObj);

        healthZoneNames.forEach((zone) => {
          if (!output[el][zone]) {
            output[el] = { ...output[el], [zone]: {} };
          }
          output[el][zone][key] = Math.floor(inputObj[zone]);
        });
      }
    }
  });
  return output;
};
