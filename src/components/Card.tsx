import React, { useState } from 'react';
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

const getButtonClassName = (option: string, selectedOption: string | null, answer: string) => {
    if (selectedOption && option === selectedOption) {
        return option !== answer ? 'incorrect' : 'correct';
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
    const [isCorrect, setIsCorrect] = useState(false);
    const shuffledOptions = shuffleArray(oldEnglish);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsCorrect(option === answer);
    };

    const buttonText = isCorrect ? 'Next' : 'Try Again';

    return (
        <section className='card multiple-choice'>
            <h3>{modern}</h3>
            {shuffledOptions.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={getButtonClassName(option, selectedOption, answer)}
                    disabled={!!selectedOption} // Disable buttons after an option is selected
                >
                    {option}
                </button>
            ))}

            {selectedOption && (
                <button className='next-button' onClick={onComplete}>
                    {buttonText}
                </button>
            )}
        </section>
    );
};

export default Card;
