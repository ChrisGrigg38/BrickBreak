import { setupLevel } from "./levelSetup";

test('test setup level based on arena size', () => {
    let arenaInfo = setupLevel(1, 10, 10, 300, 300);
    expect(arenaInfo[0].initialX).toEqual(18.823529411764707);
    expect(arenaInfo[0].initialY).toEqual(19.375);
    expect(arenaInfo[0].height).toEqual(9.375);
});

