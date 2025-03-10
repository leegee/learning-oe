// src/components/Lesson.tsx
import { useState } from 'react';
import MultipleChoice from './cards/MultipleChoice';
import VocabMatch from './cards/VocabMatch';
import BlanksCard from './cards/BlanksCard';
import { Lesson } from '../types/lessons';
import './Lesson.css';

interface LessonProps extends Lesson {
    onComplete: () => void;
};

const LessonComponent = ({ title, cards, onComplete }: LessonProps) => {
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

    const goToNextCard = () => {
        console.log('Going to next card from ', currentCardIndex);
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex((prevIndex) => prevIndex + 1);
        } else {
            onComplete();
        }
    };

    const currentCard = cards[currentCardIndex];
    const progress = (currentCardIndex + 1) / cards.length;

    console.log('Current card index is ', currentCardIndex, 'progress', progress);

    return (
        <section>
            <h2>{title}</h2>
            <progress
                value={progress}
                max={1}
                style={{ width: '100%', height: '5pt' }}
            ></progress>

            {currentCard.class === 'multiple-choice' && (
                <MultipleChoice
                    question={currentCard.question}
                    answers={currentCard.answers}
                    answer={currentCard.answer}
                    onComplete={goToNextCard}
                />
            )}

            {currentCard.class === 'vocab' && (
                <VocabMatch
                    question={currentCard.question}
                    vocab={currentCard.vocab}
                    onComplete={goToNextCard}
                />
            )}

            {currentCard.class === 'blanks' && (
                <BlanksCard
                    question={currentCard.question}
                    words={currentCard.words}
                    onComplete={goToNextCard}
                />
            )}
        </section>
    );
};

export default LessonComponent;
