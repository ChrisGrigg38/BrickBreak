import React, { useEffect, useState } from 'react';
import './Block.css';
import { BlockType } from '../../types';

export interface BlockProps {
    initialX: number;
    initialY: number;
    blockHeight: number;
    blockWidth: number;
    type: BlockType;
};

const Block = ({initialX, initialY, type, blockHeight, blockWidth}: BlockProps) => {
    return (
      <div className={"Block " + type} data-testid="block" style={{top: initialY, left: initialX, height: blockHeight, width: blockWidth}}>
      </div>
    );
  }
  
  export default Block;