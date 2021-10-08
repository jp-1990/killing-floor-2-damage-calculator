import { selectPerk } from "../utils/selectPerk";
import { Commando } from "../../perks/commando";

it("builds instance of expected perk based on input", () => {
  const perkName = "commando";
  const perk = selectPerk({ perk: perkName, level: 25, skills: {} });

  expect(perk).toBeInstanceOf(Commando);
});

it("builds perk with expected values based on input", () => {
  const perkName = "commando";
  const perk = selectPerk({ perk: perkName, level: 25, skills: {} });

  expect(perk.level).toBe(25);
  expect(perk.perks).toStrictEqual({});
  expect(perk.stats).toStrictEqual({
    damageMultiplier: 0.25,
    resets: 6,
    reloadSpeedIncrease: 0.1,
    recoilReduction: 0.5,
    sightRange: 60,
  });
});

it("builds perk with expected perks based on input", () => {
  const perkName = "commando";
  const perk = selectPerk({
    perk: perkName,
    level: 25,
    skills: {
      5: "high capacity mags",
      10: "fallback",
      15: "prepared",
      20: "hollow point rounds",
    },
  });

  expect(perk.perks).toStrictEqual({
    5: "high capacity mags",
    10: "fallback",
    15: "prepared",
    20: "hollow point rounds",
  });
  expect(perk.stats).toStrictEqual({
    "9mm": 0.85,
    knife: 0.85,
    damageMultiplier: 0.55,
    resets: 6,
    reloadSpeedIncrease: 0.1,
    recoilReduction: 0.5,
    sightRange: 60,
    magSizeIncrease: 0.5,
    maxAmmoIncrease: 0.2,
    weaponSwitchIncrease: 0.5,
  });
});
