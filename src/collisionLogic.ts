import { RefObject } from "react";
import { BlockInfo, CollideSide, Pos, UpdatedMoveBall } from "./types";
import { ArenaTopSpace, ArenaWidth, BallHeight, BallWidth, FOVValue, PadderHeight } from "./constants";

export const blockCollide = (prevPos1X: number,
    prevPos1Y: number,
    pos1X: number,
    pos1Y: number,
    width1: number,
    height1: number,
    pos2X: number,
    pos2Y: number,
    width2: number,
    height2: number): CollideSide => {


    //top left collide
    if (pos1X >= pos2X &&
        pos1X <= pos2X + width2 &&
        pos1Y >= pos2Y &&
        pos1Y <= pos2Y + height2) {
        if (prevPos1X > pos2X + width2) {
            return CollideSide.COLLIDE_RIGHT;
        }
        else if (prevPos1Y > pos2Y + height2) {
            return CollideSide.COLLIDE_BOTTOM;
        } else {
            return CollideSide.COLLIDE_BOTTOM;
        }
    }

    //top right collide
    if (pos1X + width1 >= pos2X &&
        pos1X + width1 <= pos2X + width2 &&
        pos1Y >= pos2Y &&
        pos1Y <= pos2Y + height2) {
        if (prevPos1X + width1 < pos2X) {
            return CollideSide.COLLIDE_LEFT;
        }
        else if (prevPos1Y < pos2Y + height2) {
            return CollideSide.COLLIDE_BOTTOM;
        } else {
            return CollideSide.COLLIDE_BOTTOM;
        }
    }

    //bottom left collide
    if (pos1X >= pos2X &&
        pos1X <= pos2X + width2 &&
        pos1Y + height1 >= pos2Y &&
        pos1Y + height1 <= pos2Y + height2) {
        if (prevPos1X > pos2X + width2) {
            return CollideSide.COLLIDE_RIGHT;
        }
        else if (prevPos1Y + height1 > pos2Y) {
            return CollideSide.COLLIDE_TOP;
        } else {
            return CollideSide.COLLIDE_TOP;
        }
    }

    //bottom right collide
    if (pos1X + width1 >= pos2X &&
        pos1X + width1 <= pos2X + width2 &&
        pos1Y + height1 >= pos2Y &&
        pos1Y + height1 <= pos2Y + height2) {
        if (prevPos1X + width1 < pos2X) {
            return CollideSide.COLLIDE_LEFT;
        }
        else if (prevPos1Y + height1 > pos2Y) {
            return CollideSide.COLLIDE_TOP;
        } else {
            return CollideSide.COLLIDE_TOP;
        }
    }

    return CollideSide.NO_COLLISION;
};

export const moveBallCollisionCheck = (pos: Pos,
    arenaOffsetLeft: number,
    arenaOffsetWidth: number,
    arenaOffsetTop: number,
    arenaOffsetHeight: number,
    padderX: number,
    padderY: number,
    padderSize: number,
    blocks: BlockInfo[],
    levelNum: number): UpdatedMoveBall => {

    let newX = pos.X + pos.velX;
    let newY = pos.Y + pos.velY;
    let newVelX = pos.velX;
    let newVelY = pos.velY;
    let outsideArena = false;

    //these are cheap collision checks, we could do more expensive ones but we need to keep the performance...
    // arena collisions
    let collideArenaRight = blockCollide(pos.X,
        pos.Y,
        newX,
        newY,
        BallWidth,
        BallHeight,
        (arenaOffsetLeft + arenaOffsetWidth) - 10,
        arenaOffsetTop,
        arenaOffsetWidth,
        arenaOffsetHeight);

    if (collideArenaRight !== CollideSide.NO_COLLISION) {
        newVelX = -newVelX;
    }

    let collideArenaLeft = blockCollide(pos.X,
        pos.Y,
        newX,
        newY,
        BallWidth,
        BallHeight,
        arenaOffsetLeft,
        arenaOffsetTop,
        ArenaWidth,
        arenaOffsetHeight);

    if (collideArenaLeft !== CollideSide.NO_COLLISION) {
        newVelX = -newVelX;
    }

    let collideArenaTop = blockCollide(pos.X,
        pos.Y,
        newX,
        newY,
        BallWidth,
        BallHeight,
        arenaOffsetLeft,
        arenaOffsetTop,
        arenaOffsetWidth,
        ArenaTopSpace);

    if (collideArenaTop !== CollideSide.NO_COLLISION) {
        newVelY = -newVelY;
    }

    if (newY > arenaOffsetTop + arenaOffsetHeight) {
        outsideArena = true;
    }

    //padder collisions
    let padderCollision = blockCollide(pos.X,
        pos.Y,
        newX,
        newY,
        BallWidth,
        BallHeight,
        padderX,
        padderY,
        (padderSize * 20),
        PadderHeight);

    if (padderCollision === CollideSide.COLLIDE_TOP) {
        let mostRight = padderX + (padderSize * 20);
        let mostLeft = padderX;
        let ourLeft = newX;
        let padDiff = mostRight - mostLeft;
        let ourDiff = ourLeft - mostLeft;
        let ratio = ourDiff / padDiff;
        let angleMult = (ratio - 0.5) * FOVValue;

        newVelX = Math.sin(angleMult) * (levelNum + 3);
        newVelY = -Math.abs(Math.cos(angleMult) * (levelNum + 3));
    }
    else if (padderCollision === CollideSide.COLLIDE_LEFT ||
        padderCollision === CollideSide.COLLIDE_RIGHT
    ) {
        newVelX = -newVelX;
    }

    let newBlocks = [...blocks];
    let changedBlocks = false;
    let blocksHit = 0;

    //block collisions
    blocks.forEach((x, index) => {
        if (x.visible) {
            let blockCollision = blockCollide(pos.X,
                pos.Y,
                newX,
                newY,
                BallWidth,
                BallHeight,
                x.initialX,
                x.initialY,
                x.width,
                x.height);

            if (blockCollision === CollideSide.COLLIDE_LEFT ||
                blockCollision === CollideSide.COLLIDE_RIGHT
            ) {
                newVelX = -newVelX;
                newBlocks[index].visible = false;
                changedBlocks = true;
                blocksHit++;
            }

            if (blockCollision === CollideSide.COLLIDE_TOP ||
                blockCollision === CollideSide.COLLIDE_BOTTOM
            ) {
                newVelY = -newVelY;
                newBlocks[index].visible = false;
                changedBlocks = true;
                blocksHit++;
            }
        }
    });

    return {
        ballPos: {
            X: newX,
            Y: newY,
            velX: newVelX,
            velY: newVelY,
        },
        updatedBlocks: changedBlocks ? newBlocks : undefined,
        blocksHit: blocksHit,
        outsideArena: outsideArena,
    }

};
