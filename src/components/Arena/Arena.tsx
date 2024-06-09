import { useEffect, useRef, useState } from 'react';
import './Arena.css';
import Padder from '../Padder/Padder';
import Ball from '../Ball/Ball';
import { BallInfo, BlockInfo, Pos } from '../../types';
import Block from '../Block/Block';
import { setupLevel } from '../../levelSetup';
import { moveBallCollisionCheck } from '../../collisionLogic';
import Scoreboard from '../Scoreboard/Scoreboard';
import { ScorePerBlock } from '../../constants';

const Arena = () => {

    const [padderX, setPadderX] = useState<number>(0);
    const [padderY, setPadderY] = useState<number>(0);
    const [padderSize, setPadderSize] = useState<number>(3);
    const [balls, setBalls] = useState<BallInfo[]>([]);
    const arenaRef = useRef<HTMLDivElement>(null);
    const [blocks, setBlocks] = useState<BlockInfo[]>([]);
    const [levelNum, setLevelNum] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [ingame, setIngame] = useState<boolean>(false);
    const [showGameOver, setShowGameOver] = useState<boolean>(false);
    const [showLevelCleared, setShowLevelCleared] = useState<boolean>(false);

    const moveBall = (pos: Pos, id: number): Pos => {
        if (arenaRef.current) {
            let updatedMoveBall = moveBallCollisionCheck(pos, arenaRef.current.offsetLeft, arenaRef.current.offsetWidth, arenaRef.current.offsetTop,arenaRef.current.offsetHeight,padderX, padderY, padderSize, blocks, levelNum);

            if (updatedMoveBall.updatedBlocks) {
                setScore(score + (updatedMoveBall.blocksHit * ScorePerBlock));
                setBlocks(updatedMoveBall.updatedBlocks);

                let blocksRemaining = updatedMoveBall.updatedBlocks.filter((x) => x.visible);

                if(blocksRemaining.length === 0) {
                    setIngame(false);
                    setBalls([]);
                    setShowLevelCleared(true);
                }
            }
        

            if (updatedMoveBall.outsideArena) {
                let newBalls = balls.filter((x) => x.id !== id);

                if(newBalls.length === 0) {
                    setIngame(false);
                    setLevelNum(0);
                    setShowGameOver(true);
                    setBlocks([]);
                    setBalls([]);        
                } else {
                    setBalls(newBalls);
                }
            }

            return updatedMoveBall.ballPos;
        }

        return pos;
    };

    const movePadder = (e: any) => {
        let locationX = 0;

        if (e.clientX) {
            locationX = e.clientX - ((padderSize * 20) / 2);
        } else if (e.touches.length > 0) {
            locationX = e.touches[0].clientX - ((padderSize * 20) / 2);
        }

        if (arenaRef.current) {
            const left = arenaRef.current.offsetLeft + 10;
            const right = (arenaRef.current.offsetLeft + arenaRef.current.offsetWidth) - ((padderSize * 20) + 10);

            if (locationX >= left && locationX <= right) {
                setPadderX(locationX);
            }
        }
    };

    const startGame = () => {
        if (arenaRef.current) {
            const left = arenaRef.current.offsetLeft;
            const top = arenaRef.current.offsetTop;
            const right = arenaRef.current.offsetLeft + arenaRef.current.offsetWidth;
            const bottom = arenaRef.current.offsetTop + arenaRef.current.offsetHeight;

            if(levelNum === 0) {
                setScore(0);
            }

            setBlocks(setupLevel(levelNum+1,
                left,
                top,
                arenaRef.current.offsetHeight,
                arenaRef.current.offsetWidth));
            setPadderX(((right - left) / 2) + left);
            setPadderY(bottom - 90);
            setBalls([{ id: 1, initialX: ((right - left) / 2) + left, initialY: bottom - 80, initialXVel: Math.sin(0) * (levelNum+3), initialYVel: (-Math.cos(0)) * (levelNum+3), speed: 10 }]);
            setIngame(true);
            setLevelNum(levelNum+1);
            setShowLevelCleared(false);
            setShowGameOver(false);
        }
    };

    return (
        <div className="Arena">
            <Scoreboard score={score} ingame={ingame} levelnum={levelNum} startNewGame={startGame} />
            <div className="PlayArea" onMouseMove={movePadder} onTouchMove={movePadder} ref={arenaRef}>
                {ingame ? <Padder X={padderX} Y={padderY} size={padderSize} /> : null}
                {balls.map((x) => (
                    <Ball key={x.id}
                        id={x.id}
                        speed={x.speed}
                        initialX={x.initialX}
                        initialY={x.initialY}
                        initialXVel={x.initialXVel}
                        initialYVel={x.initialYVel}
                        checkMove={moveBall}
                    />
                ))}
                {showLevelCleared ? <div className="gameText">Level Cleared!</div> : null}
                {showGameOver ? <div className="gameText">Game Over!</div> : null}
                {blocks.map((x) => {
                    return x.visible ? <Block initialX={x.initialX} initialY={x.initialY} type={x.color} key={x.id} blockHeight={x.height} blockWidth={x.width} /> : null
                })}
            </div>
        </div>
    );
}

export default Arena;