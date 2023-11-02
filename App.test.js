import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App component without crashing', () => {
  render(<App />);
});

test('displays the Login component on the "/" route', () => {
  const { getByText } = render(<App />);
  const loginElement = getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});