import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App'; // Adjust the import if necessary
import { lessons } from './data/lessons'; // Import lessons from the data file

// Test the App component
describe('App Component', () => {
  lessons.forEach(lesson => {
    describe(`Lesson: ${lesson.title}`, () => {
      lesson.cards.forEach((card, cardIndex) => {
        it(`should render card ${cardIndex + 1} with correct options`, async () => {
          render(<App />);

          // Check if the "question" sentence is rendered
          expect(screen.getByText(new RegExp(card.question, 'i'))).toBeInTheDocument();

          // Check if each "answers" option is rendered
          card.answers.forEach(option => {
            expect(screen.getByText(new RegExp(option, 'i'))).toBeInTheDocument();
          });
        });

        it(`should disable buttons after selecting an option for card ${cardIndex + 1}`, async () => {
          render(<App />);

          // Select the first option (for example, the first option in answers)
          fireEvent.click(screen.getByText(card.answers[0]));

          // Ensure the button is disabled
          expect(screen.getByText(card.answers[0])).toBeDisabled();
        });

        it(`should show a modal when an option is selected for card ${cardIndex + 1}`, async () => {
          render(<App />);

          // Click on the first option (e.g., the first option in answers)
          fireEvent.click(screen.getByText(card.answers[0]));

          // Wait for the modal to appear and show the correct message
          await waitFor(() => {
            expect(screen.getByText(/Correct! Well done./i)).toBeInTheDocument();
          });
        });

        it(`should move to the next card when the "Next" button is clicked for card ${cardIndex + 1}`, async () => {
          render(<App />);

          // Click on the first option
          fireEvent.click(screen.getByText(card.answers[0]));

          // Wait for the modal to show
          await waitFor(() => {
            expect(screen.getByText(/Next/i)).toBeInTheDocument();
          });

          // Click the "Next" button in the modal
          fireEvent.click(screen.getByText(/Next/i));

          // Verify that the new card (next lesson) is displayed
          const nextCard = lesson.cards[cardIndex + 1] || lesson.cards[0]; // For the last card, loop back to the first card
          expect(screen.getByText(new RegExp(nextCard.question, 'i'))).toBeInTheDocument();
        });
      });
    });
  });
});
