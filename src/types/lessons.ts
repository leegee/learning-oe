// src/types/lessons.ts

export type Lesson = {
    title: string;
    cards: (VocabCard | BlanksCard | MultipleChoiceCard)[]; // Cards can be any of the three types
};

export type VocabCard = {
    class: 'vocab';
    question: string;
    vocab: { [key: string]: string }[]; // Each entry is a key-value pair of word translation
};

export type MultipleChoiceCard = {
    class: 'multiple-choice';
    question: string;
    answers: string[]; // Array of possible answers
    answer: string; // Correct answer
};

export type BlanksCard = {
    class: 'blanks';
    question: string;
    words: { word: string; correct: boolean }[]; // Array of words with a correct boolean flag
};
