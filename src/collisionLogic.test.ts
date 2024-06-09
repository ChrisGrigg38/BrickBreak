import { blockCollide, moveBallCollisionCheck } from "./collisionLogic";
import { BlockType, CollideSide } from "./types";

test('test block collide bottom', () => {
    let collideInfo = blockCollide(10, 10, 12, 10, 10, 10, 20, 10, 10, 10);
    expect(collideInfo).toEqual(CollideSide.COLLIDE_BOTTOM);
});

test('test block collide top', () => {
    let collideInfo = blockCollide(10, 10, 10, 12, 10, 10, 10, 20, 10, 10);
    expect(collideInfo).toEqual(CollideSide.COLLIDE_TOP);
});

test('test block collide left', () => {
    let collideInfo = blockCollide(9, 10, 12, 10, 10, 10, 20, 6, 10, 20);
    expect(collideInfo).toEqual(CollideSide.COLLIDE_LEFT);
});

test('test block collide right', () => {
    let collideInfo = blockCollide(31, 10, 29, 10, 10, 10, 20, 10, 10, 10);
    expect(collideInfo).toEqual(CollideSide.COLLIDE_RIGHT);
});

test('test block no collision', () => {
    let collideInfo = blockCollide(61, 10, 59, 10, 10, 10, 20, 10, 10, 10);
    expect(collideInfo).toEqual(CollideSide.NO_COLLISION);
});

test('test move ball hit right side arena', () => {
    let collideInfo = moveBallCollisionCheck({velX: 10, velY: 1, X: 290, Y: 10}, 10, 280, 10, 300, 10, 10, 60, [], 1);
    expect(collideInfo).toEqual({"ballPos": {"X": 300, "Y": 11, "velX": -10, "velY": 1}, "blocksHit": 0, "outsideArena": false, "updatedBlocks": undefined});
});

test('test move ball hit left side arena', () => {
    let collideInfo = moveBallCollisionCheck({velX: -10, velY: 0, X: 0, Y: 10}, 10, 280, 10, 300, 10, 10, 60, [], 1);
    expect(collideInfo).toEqual({"ballPos": {"X": -10, "Y": 10, "velX": -10, "velY": 0}, "blocksHit": 0, "outsideArena": false, "updatedBlocks": undefined});
});

test('test move ball hit top side arena', () => {
    let collideInfo = moveBallCollisionCheck({velX: 0, velY: -1, X: 40, Y: 10}, 10, 280, 10, 300, 80, 80, 60, [], 1);
    expect(collideInfo).toEqual({"ballPos": {"X": 40, "Y": 9, "velX": 0, "velY": 1}, "blocksHit": 0, "outsideArena": false, "updatedBlocks": undefined});
});

test('test move ball outside arena', () => {
    let collideInfo = moveBallCollisionCheck({velX: 0, velY: 10, X: 40, Y: 310}, 10, 280, 10, 300, 10, 10, 60, [], 1);
    expect(collideInfo).toEqual({"ballPos": {"X": 40, "Y": 320, "velX": 0, "velY": 10}, "blocksHit": 0, "outsideArena": true, "updatedBlocks": undefined});
});

test('test padder collisions', () => {
    let collideInfo = moveBallCollisionCheck({velX: 0, velY: 5, X: 80, Y: 70}, 10, 280, 10, 300, 80, 80, 60, [], 1);
    expect(collideInfo).toEqual({"ballPos": {"X": 80, "Y": 75, "velX": 1.712730677984604, "velY": -3.614768820366027}, "blocksHit": 0, "outsideArena": false, "updatedBlocks": undefined});
});

test('test block collisions', () => {
    let collideInfo = moveBallCollisionCheck({velX: 0, velY: -5, X: 20, Y: 40}, 10, 280, 10, 300, 80, 80, 60, [{color: BlockType.BLUE, height: 20, id: 1, initialX: 20, initialY: 20, visible: true, width: 60}], 1);
    expect(collideInfo).toEqual({"ballPos": {"X": 20, "Y": 35, "velX": -0, "velY": 5}, "blocksHit": 1, "outsideArena": false, "updatedBlocks": [{color: BlockType.BLUE, height: 20, id: 1, initialX: 20, initialY: 20, visible: false, width: 60}]});
});