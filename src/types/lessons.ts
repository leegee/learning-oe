// src/types/lessons.ts
export type Lesson = {
    title: string;
    cards: (VocabCard | MultipleChoiceCard)[];
};

export type VocabCard = {
    class: 'vocab';
    question: string;
    vocab: { [key: string]: string }[]; // key-value pairs of word translation
};

export type MultipleChoiceCard = {
    class: 'multiple-choice';
    question: string;
    answers: string[];
    answer: string;
};
