import React, { RefObject, useEffect, useState } from 'react';
import './Padder.css';

export interface PadderProps {
    X: number;
    Y: number;
    size: number;
    ref?: RefObject<HTMLDivElement>;
};

const Padder = ({X, Y, size, ref}: PadderProps) => {

    return (
      <div ref={ref} data-testid="padder" className="Padder" style={{top: Y, left: X, width: size * 20}}>
      </div>
    );
  }
  
  export default Padder;