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

    return (
        <div className="mb-6 p-4 border rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">Lesson: {title}</h2>
            <Card
                modern={currentCard.modern}
                oldEnglish={currentCard.oldEnglish}
                answer={currentCard.answer}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                onComplete={goToNextCard}
            />
        </div>
    );
};

export default Lesson;
