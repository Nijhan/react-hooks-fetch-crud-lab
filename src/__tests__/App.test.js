import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ this enables toBeInTheDocument
import App from '../components/App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            prompt: 'lorem testum 1',
            answers: ['A1', 'A2', 'A3', 'A4'],
            correctIndex: 0,
          },
          {
            id: 2,
            prompt: 'lorem testum 2',
            answers: ['B1', 'B2', 'B3', 'B4'],
            correctIndex: 1,
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('displays question prompts after fetching', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/i));
  expect(await screen.findByText(/lorem testum 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/i)).toBeInTheDocument();
});
