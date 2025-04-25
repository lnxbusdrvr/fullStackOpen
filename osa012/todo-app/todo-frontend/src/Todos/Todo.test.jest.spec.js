import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from './Todo';

test('renders todo item correctly', () => {
  render(<Todo text="Test foo bar heissulei" done={false} />);
  const textElement = screen.getByText('Test foo bar heissulei');
  expect(textElement).toBeInTheDocument();
});

