import { render, screen } from '@testing-library/react';
import { Page404 } from './Page404';

test('renders Page404 component', () => {
  render(<Page404 />);
  expect(screen.getByText(`Error Message`)).toBeInTheDocument();
});
