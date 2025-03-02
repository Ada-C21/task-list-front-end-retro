import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

test("renders Ada's Task List", () => {
  // Act
  render(<App />);
  const linkElement = screen.getByText(/Ada's Task List/i);
  // Assert
  expect(linkElement).toBeInTheDocument();
});
