import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  test('renders without crashing', () => {
    render(<SearchInput onChange={() => {}} />);
  });

  test('calls onChange prop when input value changes', () => {
    const onChangeMock = jest.fn();
    render(<SearchInput onChange={onChangeMock} />);

    const inputElement = screen.getByPlaceholderText('Search');

    // Simulate typing in the input
    fireEvent.change(inputElement, { target: { value: 'test value' } });

    // The onChangeMock function should be called with the new value
    expect(onChangeMock).toHaveBeenCalledWith('test value');
  });
});
