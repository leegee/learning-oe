// src/components/Lesson.tsx
import { useState } from 'react';
import MultipleChoice from './MultipleChoice';
import VocabMatch from './VocabMatch';

interface LessonProps {
    title: string;
    cards: (
        | {
            class: 'multiple-choice';
            question: string;
            answers: string[];
            answer: string;
        }
        | {
            class: 'vocab';
            question: string;
            vocab: { [lang1: string]: string }[];
        }
    )[];
    onComplete: () => void;
}

const Lesson = ({ title, cards, onComplete }: LessonProps) => {
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

    console.log('Current card index is ', currentCardIndex);

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
        </section>
    );
};

export default Lesson;
