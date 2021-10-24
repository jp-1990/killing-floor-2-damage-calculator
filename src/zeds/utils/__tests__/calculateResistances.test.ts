import { calculateResistances } from "../calculateResistances";

describe("calculateResistances - function", () => {
  it("returns input if players arg does not equal 1", () => {
    const output = calculateResistances(
      { fire: 0.5, toxic: 0.3, rifle: 0.8 },
      6
    );

    expect(output).toStrictEqual({ fire: 0.5, toxic: 0.3, rifle: 0.8 });
  });

  it("returns modified resistances if players arg equals 1", () => {
    const output = calculateResistances(
      { fire: 0.5, toxic: 0.3, rifle: 0.8 },
      1
    );

    expect(output).toStrictEqual({ fire: 0.625, toxic: 0.475, rifle: 0.85 });
  });
});
