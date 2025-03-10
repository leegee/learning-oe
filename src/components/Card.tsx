import React, { useState, useEffect } from 'react';
import './Card.css';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

interface CardProps {
    modern: string;
    oldEnglish: string[];
    answer: string;
    selectedOption: string | null;
    setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
    onComplete: () => void;
}

const getButtonClassName = (option: string, isCorrect: boolean | null, selectedOption: string | null) => {
    if (isCorrect === null) {
        return '';
    }
    if (selectedOption && option === selectedOption) {
        return isCorrect ? 'correct' : 'incorrect';
    }
    return '';
};

const Card = ({
    modern,
    oldEnglish,
    answer,
    selectedOption,
    setSelectedOption,
    onComplete,
}: CardProps) => {
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    useEffect(() => {
        setShuffledOptions(shuffleArray(oldEnglish));
    }, []);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsCorrect(option === answer);
    };

    const handleNextClick = () => {
        setSelectedOption(null);
        if (isCorrect) {
            onComplete();
        }
    };

    return (
        <section className='card multiple-choice'>
            <h3>{modern}</h3>
            {shuffledOptions.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={getButtonClassName(option, isCorrect, selectedOption)}
                >
                    {option}
                </button>
            ))}

            {selectedOption && (
                <button
                    className='next-button'
                    onClick={handleNextClick}
                >
                    {isCorrect ? 'Next' : 'Try Again'}
                </button>
            )}
        </section>
    );
};

export default Card;
