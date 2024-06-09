import React from 'react';
import { render, screen } from '@testing-library/react';
import Block from './Block';
import { BlockType } from '../../types';

test('renders blue block', async () => {
    render(<Block initialX={0} initialY={0} type={BlockType.BLUE} blockHeight={0} blockWidth={0} />);
 
    let blockElement = await screen.findAllByTestId("block");
    expect(blockElement[0].className).toEqual("Block BlockBlue");
});


test('renders green block', async () => {
    render(<Block initialX={0} initialY={0} type={BlockType.GREEN} blockHeight={0} blockWidth={0} />);
  
    let blockElement = await screen.findAllByTestId("block");
    expect(blockElement[0].className).toEqual("Block BlockGreen");
});


test('renders red block', async () => {
    render(<Block initialX={0} initialY={0} type={BlockType.RED} blockHeight={0} blockWidth={0} />);
  
    let blockElement = await screen.findAllByTestId("block");
    expect(blockElement[0].className).toEqual("Block BlockRed");
});


test('renders pink block', async () => {
    render(<Block initialX={0} initialY={0} type={BlockType.PINK} blockHeight={0} blockWidth={0} />);
  
    let blockElement = await screen.findAllByTestId("block");
    expect(blockElement[0].className).toEqual("Block BlockPink");
});