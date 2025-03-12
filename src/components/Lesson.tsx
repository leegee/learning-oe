// src/components/Lesson.tsx
import { useState } from 'react';
import { useTranslation } from "react-i18next";

import MultipleChoice from './cards/MultipleChoice';
import VocabMatch from './cards/VocabMatch';
import BlanksCard from './cards/BlanksCard';
import { type Lesson } from '../Lessons';
import './Lesson.css';

interface LessonProps {
    lesson: Lesson;
    onIncorrectAnswer: (incorrectAnswer: string) => void;
    onComplete: () => void;
};

const LessonComponent = ({ lesson, onIncorrectAnswer, onComplete }: LessonProps) => {
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
    const { t } = useTranslation();

    const goToNextCard = () => {
        if (currentCardIndex < lesson.cards.length - 1) {
            setCurrentCardIndex((prevIndex) => prevIndex + 1);
        } else {
            onComplete();
        }
    };

    const onIncorrect = () => {
        console.log('On Incorrect: ');
        // TODO onIncorrect should receive something to store here
        onIncorrectAnswer("incorrectAnswer");
    }

    const currentCard = lesson.cards[currentCardIndex];
    const progress = (currentCardIndex + 1) / lesson.cards.length;

    return (
        <article className='lesson'>
            <h2>{t('lesson')}: <em>{lesson.title}</em></h2>
            <progress
                value={progress}
                max={1}
            ></progress>

            {currentCard.class === 'multiple-choice' && (
                <MultipleChoice
                    card={currentCard}
                    onComplete={goToNextCard}
                    onIncorrect={onIncorrect}
                />
            )}

            {currentCard.class === 'vocab' && (
                <VocabMatch
                    card={currentCard}
                    onIncorrect={onIncorrect}
                    onComplete={goToNextCard}
                />
            )}

            {currentCard.class === 'blanks' && (
                <BlanksCard
                    card={currentCard}
                    onIncorrect={onIncorrect}
                    onComplete={goToNextCard}
                />
            )}
        </article>
    );
};

export default LessonComponent;
