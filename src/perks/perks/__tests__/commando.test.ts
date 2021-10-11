import { Commando } from "../commando";

describe("commando class", () => {
  const commando = new Commando({
    level: 20,
    skills: [undefined, undefined, undefined, undefined],
  });
  it("returns instance of Commando", () => {
    expect(commando).toBeInstanceOf(Commando);
  });
});
