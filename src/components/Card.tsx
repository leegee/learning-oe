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
        if (option !== answer) {
            return 'w-full p-2 border rounded bg-red-200 correct';
        }
        return 'w-full p-2 border rounded bg-green-200 incorrect';
    }
    return 'w-full p-2 border rounded';
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
        <div>
            <h3 className="text-lg mb-4">Modern English: {modern}</h3>
            <div className="space-y-2">
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
            </div>

            {/* Render the action button */}
            {selectedOption && (
                <button
                    onClick={onComplete} // Proceed to the next lesson or card
                    className="w-full p-2 mt-4 border rounded bg-blue-500 text-white"
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default Card;
