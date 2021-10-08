import { Loadout } from "./loadout";

const commando = {
  perk: 'commando',
  level: 20,
  skills: {
    5: 'high capacity mags',
    10: "fallback",
    15: "prepared",
    20: "hollow point rounds",
  },
};
const game = { difficulty: "suicidal", players: 6 };

const loadout1 = new Loadout(
  // @ts-expect-error
  commando,
  [
    { name: "ak12", upgrade: 0 },
    { name: "ar15", upgrade: 4 },
    { name: "bullpup", upgrade: 3 },
    { name: "m16", upgrade: 0 },
    { name: "mkb42", upgrade: 2 },
    { name: "scar", upgrade: 0 },
    { name: "fnfal", upgrade: 0 },
  ],
  game
);

export { Loadout, loadout1 };
