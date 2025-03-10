// src/components/Lesson.tsx
import { useState } from 'react';
import Card from './Card';

interface LessonProps {
    title: string;
    cards: {
        modern: string;
        oldEnglish: string[];
        answer: string;
    }[];
    onComplete: () => void;
}

const Lesson = ({ title, cards, onComplete }: LessonProps) => {
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const goToNextCard = () => {
        setSelectedOption(null);

        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else {
            onComplete();
        }
    };

    const currentCard = cards[currentCardIndex];

    const progress = ((currentCardIndex + 1) / cards.length);

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
                oldEnglish={currentCard.oldEnglish}
                answer={currentCard.answer}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                onComplete={goToNextCard}
            />
        </section>
    );
};

export default Lesson;
