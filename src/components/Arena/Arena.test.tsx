import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Arena from './Arena';

test('renders arena', async () => {
  render(<Arena />);
  expect(screen.getByTestId("startGameBut")).toBeInTheDocument();
  expect(screen.getByTestId("score").innerHTML).toEqual("Score: 0");

  act(() => {
    screen.getByTestId("startGameBut").click();
  });

  expect(screen.getByTestId("ball")).toBeInTheDocument();
  
});