import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { shuffleArray } from '../../lib/shuffle-array.ts';
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

const MultipleChoice = ({ card, onCorrect, onIncorrect, onComplete }: MultipleChoiceCardProps) => {
    const [langs, setLangs] = useState<setQandALangsReturnType>(setQandALangs(card));
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        setShuffledOptions(shuffleArray(card.answers));
        setLangs(setQandALangs(card));
        setSelectedOption(null);
        setIsIncorrect(false);
    }, [card]);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsIncorrect(option !== card.answer);
    };

    const handleNextClick = () => {
        if (selectedOption === card.answer) {
            onCorrect();
            onComplete();
        } else {
            onIncorrect();
            setSelectedOption(null);
            setIsIncorrect(false);
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
                        className={`multiple-choice-button ${isIncorrect && selectedOption === option ? 'incorrect' : ''}`}
                    >
                        {option}
                    </button>
                ))}
            </section>

            {selectedOption && (
                <button
                    className={isIncorrect ? 'try-again-button' : 'next-button'}
                    onClick={handleNextClick}
                >
                    {isIncorrect ? t('try_again') : t('next')}
                </button>
            )}
        </>
    );
};

export default MultipleChoice;
