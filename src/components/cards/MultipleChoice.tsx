// MultipleChoice.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { shuffleArray } from '../../lib/shuffle-array.ts'
import { type Card } from './Card.ts';
import { setQandALangs, setQandALangsReturnType } from '../../lib/set-q-and-a-langs.ts';
import './MultipleChoice.css';

export type MultipleChoiceCard = Card & {
    class: 'multiple-choice';
    answers: string[];
    answer: string;
};

interface MultipleChoiceCardProps {
    card: MultipleChoiceCard;
    onCorrect: (numberOfCorrectAnswers?: number) => void;
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

const MultipleChoice = ({ card, onCorrect, onIncorrect, onComplete, }: MultipleChoiceCardProps) => {
    const [langs, setLangs] = useState<setQandALangsReturnType>(setQandALangs(card));
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        setShuffledOptions(shuffleArray(card.answers));
        setLangs(setQandALangs(card));
    }, [card]);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    const handleNextClick = () => {
        const correct = selectedOption === card.answer;
        setSelectedOption(null);
        if (correct) {
            onCorrect();
            onComplete();
        } else {
            onIncorrect();
        }
    };

    return (
        <>
            <section className='card multiple-choice'>

                <h4 lang={langs.q}>{t('in_lang_how_do_you_say', { lang: t(langs.a) })}</h4>
                <h3 lang={langs.q}>{card.question}</h3>

                {shuffledOptions.map((option, index) => (
                    <button
                        lang={langs.a}
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={'multiple-choice-button ' + getButtonClassName(option, isCorrect, selectedOption)}
                        disabled={isCorrect && selectedOption ? true : false}
                    >
                        {option}
                    </button>
                ))}
            </section>

            {selectedOption && (
                <button
                    className={selectedOption !== null ? t('next-button') : 'try-again-button'}
                    onClick={handleNextClick}
                >
                    {selectedOption !== null ? t('next') : t('try_again')}
                </button>
            )}
        </>
    );
};

export default MultipleChoice;
