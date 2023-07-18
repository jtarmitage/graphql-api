import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders Header component with text "GraphQL Demo App"', () => {
  render(<Header />);
  const headerElement = screen.getByText(/GraphQL Demo App/i);
  expect(headerElement).toBeInTheDocument();
});
