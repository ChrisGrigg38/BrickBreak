import { render, screen } from '@testing-library/react';
import Scoreboard from './Scoreboard';

test('renders scoreboard', () => {
  render(<Scoreboard score={0} ingame={false} levelnum={0} startNewGame={() => {}} />);

  expect(screen.getByTestId("score")).toBeInTheDocument();
  expect(screen.getByTestId("levelId")).toBeInTheDocument();
  expect(screen.getByTestId("startGameBut")).toBeInTheDocument();
  
});

test('renders in game scoreboard', async () => {
  render(<Scoreboard score={100} ingame={true} levelnum={1} startNewGame={() => {}} />);

  expect(screen.getByTestId("score")).toBeInTheDocument();
  expect(screen.getByTestId("levelId")).toBeInTheDocument();
  expect(screen.queryByTestId("startGameBut")).not.toBeInTheDocument();

  let scoreElement = await screen.findAllByTestId("score");
  expect(scoreElement[0].innerHTML).toEqual("Score: 100");

  let levelId = await screen.findAllByTestId("levelId");
  expect(levelId[0].innerHTML).toEqual("Level: 1");
  
});