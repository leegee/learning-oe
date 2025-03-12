import Ajv from 'ajv';

import { type MultipleChoiceCard } from './components/cards/MultipleChoice';
import { type VocabCard } from './components/cards/VocabMatch';
import { type BlanksCard } from './components/cards/BlanksCard';

import lessonsSchema from '../lessons.schema.json';
import lessonsData from '../lessons.json';

const ajv = new Ajv();
const validate = ajv.compile(lessonsSchema);
const valid = validate(lessonsData);

if (!valid) {
    console.log('Invalid lesson JSON:', validate.errors);
}

export type Lesson = {
    title: string;
    cards: (VocabCard | BlanksCard | MultipleChoiceCard)[];
};

export const lessons: Lesson[] = lessonsData as Lesson[];


