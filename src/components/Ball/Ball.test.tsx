import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Ball from './Ball';

test('renders ball', () => {
  render(<Ball speed={0} initialX={0} initialY={0} initialXVel={0} initialYVel={0} checkMove={() => {return {velX: 0, velY: 0, X: 0, Y: 0}}} id={0}/>);

  let blockElement = screen.getByTestId("ball");
  expect(blockElement.className).toEqual("Ball");
});

test('tests ball moves', () => {
  render(<Ball speed={0} initialX={0} initialY={0} initialXVel={0} initialYVel={0} checkMove={() => {return {velX: 10, velY: 10, X: 10, Y: 10}}} id={0}/>);

  let blockElement = screen.getByTestId("ball");

  waitFor(() => {
    expect(blockElement.style).toEqual({top: 10, left: 10});
  });
});