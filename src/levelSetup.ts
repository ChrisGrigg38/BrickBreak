import { BlockInfo, BlockType } from "./types";

const levelData: BlockInfo[][] = [[
    {
        color: BlockType.BLUE,
        height: 3,
        id: 1,
        initialX: 1,
        initialY: 3,
        visible: true,
        width: 3
    },
    {
        color: BlockType.BLUE,
        height: 3,
        id: 2,
        initialX: 5,
        initialY: 3,
        visible: true,
        width: 3
    },
    {
        color: BlockType.BLUE,
        height: 3,
        id: 3,
        initialX: 9,
        initialY: 3,
        visible: true,
        width: 3
    },
    {
        color: BlockType.BLUE,
        height: 3,
        id: 4,
        initialX: 13,
        initialY: 3,
        visible: true,
        width: 3
    },
    {
        color: BlockType.BLUE,
        height: 3,
        id: 5,
        initialX: 17,
        initialY: 3,
        visible: true,
        width: 3
    },
    {
        color: BlockType.BLUE,
        height: 3,
        id: 6,
        initialX: 21,
        initialY: 3,
        visible: true,
        width: 3
    },
    {
        color: BlockType.BLUE,
        height: 3,
        id: 7,
        initialX: 25,
        initialY: 3,
        visible: true,
        width: 3
    },
    {
        color: BlockType.BLUE,
        height: 3,
        id: 8,
        initialX: 29,
        initialY: 3,
        visible: true,
        width: 3
    },
    {
        color: BlockType.RED,
        height: 3,
        id: 9,
        initialX: 3,
        initialY: 8,
        visible: true,
        width: 3
    },
    {
        color: BlockType.RED,
        height: 3,
        id: 10,
        initialX: 7,
        initialY: 8,
        visible: true,
        width: 3
    },
    {
        color: BlockType.RED,
        height: 3,
        id: 11,
        initialX: 11,
        initialY: 8,
        visible: true,
        width: 3
    },
    {
        color: BlockType.RED,
        height: 3,
        id: 12,
        initialX: 15,
        initialY: 8,
        visible: true,
        width: 3
    },
    {
        color: BlockType.RED,
        height: 3,
        id: 13,
        initialX: 19,
        initialY: 8,
        visible: true,
        width: 3
    },
    {
        color: BlockType.RED,
        height: 3,
        id: 14,
        initialX: 23,
        initialY: 8,
        visible: true,
        width: 3
    },
    {
        color: BlockType.RED,
        height: 3,
        id: 15,
        initialX: 27,
        initialY: 8,
        visible: true,
        width: 3
    },
    {
        color: BlockType.YELLOW,
        height: 3,
        id: 16,
        initialX: 1,
        initialY: 12,
        visible: true,
        width: 3
    },
    {
        color: BlockType.YELLOW,
        height: 3,
        id: 17,
        initialX: 5,
        initialY: 12,
        visible: true,
        width: 3
    },
    {
        color: BlockType.YELLOW,
        height: 3,
        id: 18,
        initialX: 9,
        initialY: 12,
        visible: true,
        width: 3
    },
    {
        color: BlockType.YELLOW,
        height: 3,
        id: 19,
        initialX: 13,
        initialY: 12,
        visible: true,
        width: 3
    },
    {
        color: BlockType.YELLOW,
        height: 3,
        id: 20,
        initialX: 17,
        initialY: 12,
        visible: true,
        width: 3
    },
    {
        color: BlockType.YELLOW,
        height: 3,
        id: 21,
        initialX: 21,
        initialY: 12,
        visible: true,
        width: 3
    },
    {
        color: BlockType.YELLOW,
        height: 3,
        id: 22,
        initialX: 25,
        initialY: 12,
        visible: true,
        width: 3
    },
    {
        color: BlockType.YELLOW,
        height: 3,
        id: 23,
        initialX: 29,
        initialY: 12,
        visible: true,
        width: 3
    }
]];

export const setupLevel = (levelNum: number, 
    arenaX: number, 
    arenaY: number, 
    arenaHeight: number, 
    arenaWidth: number): BlockInfo[] => {

    const levelDataConst = levelData[(levelNum-1) % levelData.length];

    let perOneX = arenaWidth / 34;
    let perOneY = arenaHeight / 96;

    let newLevelData = levelDataConst.map((x) => {
        return {
            ...x,
            initialX: (x.initialX * perOneX) + arenaX,
            initialY: (x.initialY * perOneY) + arenaY,
            height: x.height * perOneY,
            width: x.width * perOneX,
        }
    });

    return newLevelData;
};