// MultipleChoice.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { shuffleArray } from '../../lib/shuffle-array.ts'
import './MultipleChoice.css';

interface MultipleChoiceCardProps {
    question: string;
    answers: string[];
    answer: string;
    onIncorrect: () => void;
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

const MultipleChoice = ({
    question,
    answers,
    answer,
    onIncorrect,
    onComplete,
}: MultipleChoiceCardProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        setShuffledOptions(shuffleArray(answers));
    }, [answers]);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsCorrect(option === answer);
    };

    const handleNextClick = () => {
        setSelectedOption(null);
        if (isCorrect) {
            onComplete();
        } else {
            onIncorrect();
        }
    };

    return (
        <section className='card multiple-choice'>
            <h3>{question}</h3>
            {shuffledOptions.map((option, index) => (
                <button
                    lang="ang"
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={'multiple-choice-button ' + getButtonClassName(option, isCorrect, selectedOption)}
                >
                    {option}
                </button>
            ))}

            {selectedOption && (
                <button
                    className='next-button'
                    onClick={handleNextClick}
                >
                    {isCorrect ? t('next') : t('try_again')}
                </button>
            )}
        </section>
    );
};

export default MultipleChoice;
