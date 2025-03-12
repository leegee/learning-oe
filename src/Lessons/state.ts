// Save incorrect answers for a specific lesson (mapping lesson index to incorrect answers)
const prefix = 'oe_';

const keys = {
  CURRENT_LESSON: prefix + 'current_lesson',
  INCORRECT_ANSWERS: prefix + 'incorrectAnswers'
};

// Save current lesson index (number)
export const saveCurrentLesson = (lessonIndex: number): void => {
  localStorage.setItem(keys.CURRENT_LESSON, lessonIndex.toString());
};

// Load current lesson index (defaults to 0 if not found)
export const loadCurrentLesson = (): number => {
  return parseInt(localStorage.getItem(keys.CURRENT_LESSON) || '0', 10);
};


// Load incorrect answers for a specific lesson (returns string[] for that lesson)
export const saveIncorrectAnswers = (lessonIndex: number, incorrectAnswers: string[]): void => {
  // Get existing answers or initialize an empty object
  let savedAnswers = JSON.parse(localStorage.getItem(keys.INCORRECT_ANSWERS) || '{"0":{}}');

  // Ensure `incorrectAnswers` exists
  if (!savedAnswers) {
    savedAnswers = {};
  }

  // Save the incorrect answers for the specific lesson index
  savedAnswers[lessonIndex] = incorrectAnswers;

  // Save back to localStorage
  localStorage.setItem(keys.INCORRECT_ANSWERS, JSON.stringify(savedAnswers));
};

export const loadIncorrectAnswers = (lessonIndex: number): string[] => {
  // Get stored data from localStorage
  const storedData = localStorage.getItem(keys.INCORRECT_ANSWERS);

  // Parse the data, initialize as an empty object if not found
  const parsedData = storedData ? JSON.parse(storedData) : {};

  // Access incorrect answers for the specific lesson index
  const incorrectAnswers = parsedData ? parsedData[lessonIndex] : [];

  return incorrectAnswers;
};

export const countTotalIncorrectAnswers = (): number => {
  const storedData = localStorage.getItem(keys.INCORRECT_ANSWERS);
  const parsedData: Record<number, string[]> = storedData ? JSON.parse(storedData) : {};

  // Sum up the lengths of all incorrect answer arrays
  return Object.values(parsedData).reduce((total, answers) => total + answers.length, 0);
};
