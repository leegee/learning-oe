// src/components/Lesson.tsx
import { useState } from 'react';
import Card from './Card';

interface LessonProps {
    title: string;
    cards: {
        modern: string;
        answers: string[];
        answer: string;
    }[];
    onComplete: () => void;
}

const Lesson = ({ title, cards, onComplete }: LessonProps) => {
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

    const goToNextCard = () => {
        console.log('Going to next card from ', currentCardIndex);
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            console.log('card index is now ', currentCardIndex + 1);
        } else {
            onComplete();
        }
    };

    const currentCard = cards[currentCardIndex];

    const progress = ((currentCardIndex + 1) / cards.length);

    console.log('card index is now ', currentCardIndex);

    return (
        <section>
            <h2>{title}</h2>
            <progress
                value={progress}
                max={1}
                style={{ width: '100%', height: '5pt' }}
            ></progress>
            <Card
                modern={currentCard.modern}
                answers={currentCard.answers}
                answer={currentCard.answer}
                onComplete={goToNextCard}
            />
        </section>
    );
};

export default Lesson;
