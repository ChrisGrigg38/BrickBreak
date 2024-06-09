
export enum BlockType {
    YELLOW = "BlockYellow",
    BLUE = "BlockBlue",
    GREEN = "BlockGreen",
    RED = "BlockRed",
    PINK = "BlockPink"
};

export enum CollideSide {
    NO_COLLISION,
    COLLIDE_TOP,
    COLLIDE_LEFT,
    COLLIDE_RIGHT,
    COLLIDE_BOTTOM,
};

export interface BallInfo {
     id: number;
     speed: number;
     initialX: number;
     initialY: number;
     initialXVel: number;
     initialYVel: number;
};

export interface BlockInfo {
    id: number;
    initialX: number;
    initialY: number;
    width: number;
    height: number;
    visible: boolean;
    color: BlockType;
};

export interface Pos {
    X: number;
    Y: number;
    velX: number;
    velY: number;
}

export interface UpdatedMoveBall {
    ballPos: Pos,
    updatedBlocks?: BlockInfo[];
    blocksHit: number;
    outsideArena: boolean;
}
