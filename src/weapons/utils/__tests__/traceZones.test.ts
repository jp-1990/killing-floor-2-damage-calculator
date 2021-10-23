import { traceZones } from "../traceZones";
import { DamageGroups } from "../../types";

describe("traceHead - function", () => {
  it("returns the expected value", () => {
    const fire = traceZones(DamageGroups.fire);
    const ballistic = traceZones(DamageGroups.assault_rifle);

    expect(fire).toBeFalsy();
    expect(ballistic).toBeTruthy();
  });
});
