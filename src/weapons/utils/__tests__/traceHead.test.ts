import { traceHead } from "../traceHead";
import { DamageTypes } from "../../types";

describe("traceHead - function", () => {
  it("returns the expected value", () => {
    const fire = traceHead(DamageTypes.fire);
    const ballistic = traceHead(DamageTypes.ballistic);

    expect(fire).toBeFalsy();
    expect(ballistic).toBeTruthy();
  });
});
