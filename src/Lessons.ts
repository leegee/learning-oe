import Ajv from 'ajv';

import lessonsSchema from '../lessons.schema.json';
import lessonsData from '../lessons.json';

const ajv = new Ajv();
const validate = ajv.compile(lessonsSchema);
const valid = validate(lessonsData);

if (!valid) {
    console.log('Invalid data:', validate.errors);
}

export type Lesson = {
    title: string;
    cards: (VocabCard | BlanksCard | MultipleChoiceCard)[];
};

type Card = {
    qlang: 'default' | 'target';
    question: string;
    class: string;
}

export type VocabCard = Card & {
    class: 'vocab';
    vocab: { [key: string]: string }[]; // Each entry is a key-value pair of word translation
};

export type MultipleChoiceCard = Card & {
    class: 'multiple-choice';
    answers: string[]; // Array of possible answers
    answer: string; // Correct answer
};

export type BlanksCard = Card & {
    class: 'blanks';
    words: { word: string; correct: boolean }[]; // Array of words with a correct boolean flag
};

export const lessons: Lesson[] = lessonsData as Lesson[];
