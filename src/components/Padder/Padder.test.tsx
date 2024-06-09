import { render, screen } from '@testing-library/react';
import Padder from './Padder';

test('renders padder', () => {
  render(<Padder X={0} Y={0} size={3} ref={undefined} />);

  expect(screen.getByTestId("padder")).toBeInTheDocument();
  
});