import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

test('renders ErrorMessage component with the provided message', () => {
  const errorMessage = 'Something went wrong!';
  render(<ErrorMessage message={errorMessage} />);
  const alertElement = screen.getByText(errorMessage);
  expect(alertElement).toBeInTheDocument();
});
