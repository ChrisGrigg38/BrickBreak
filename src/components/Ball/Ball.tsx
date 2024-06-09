import React, { useEffect, useState } from 'react';
import './Ball.css';
import { Pos } from '../../types';

export interface BallProps {
    speed: number;
    id: number;
    initialX: number;
    initialY: number;
    initialXVel: number;
    initialYVel: number;
    checkMove: (current: Pos, id: number) => Pos;
};

const Ball = ({speed, id, initialX, initialY, initialXVel, initialYVel, checkMove}: BallProps) => {

    const [pos, setPos] = useState<Pos>({X: initialX, Y: initialY, velX: initialXVel, velY: initialYVel});

    const moveBall = () => {
        let newPos = checkMove(pos, id);
        setPos({X: newPos.X, Y: newPos.Y, velX: newPos.velX, velY: newPos.velY});
    };

    useEffect(() => {
        setTimeout(() => {
            moveBall();
        }, speed);
    }, [pos]);

    useEffect(() => {
        setTimeout(() => {
           moveBall();
        }, speed);
    }, []);


    return (
      <div className="Ball" data-testid="ball" style={{top: pos.Y, left: pos.X}}>
      </div>
    );
  }
  
  export default Ball;