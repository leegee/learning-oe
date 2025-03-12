import { useState, useMemo } from 'react';
import { useTranslation } from "react-i18next";

import { type Card } from './Card.ts';
import { setQandALangs, setQandALangsReturnType } from '../../lib/set-q-and-a-langs.ts';
import './WritingCard.css';

export type WritingCard = Card & {
    class: 'writing';
};

interface WritingCardProps {
    card: WritingCard;
    onIncorrect: () => void;
    onComplete: () => void;
}

const normalizeText = (text: string): string => {
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
};

const WritingCard = ({ card, onIncorrect, onComplete }: WritingCardProps) => {
    const [langs] = useState<setQandALangsReturnType>(setQandALangs(card.qlang));
    const [userInput, setUserInput] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { t } = useTranslation();

    const normalizedQuestion = useMemo(() => normalizeText(card.question), [card.question]);

    const handleNextClick = () => {
        const normalizedUserInput = normalizeText(userInput);

        if (normalizedUserInput === normalizedQuestion) {
            setIsCorrect(true);
            onComplete();
        } else {
            setIsCorrect(false);
            onIncorrect();
        }
    };

    return (
        <>
            <section className='card multiple-choice'>
                <h3 lang={langs.q}>{card.question}</h3>
                <textarea
                    lang={langs.a}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
            </section>

            <button
                className='next-button'
                onClick={handleNextClick}
            >
                {isCorrect === false ? t('try_again') : t('next')}
            </button>
        </>
    );
};

export default WritingCard;
