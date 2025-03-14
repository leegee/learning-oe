import { useRef, useMemo, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { type Card } from './Card.ts';
import { setQandALangs, setQandALangsReturnType } from '../../lib/set-q-and-a-langs.ts';
import LetterButtons from '../LetterButtons';
import './WritingCard.css';

export type WritingCard = Card & {
    class: 'writing';
    answer: string;
};

interface WritingCardProps {
    card: WritingCard;
    onIncorrect: () => void;
    onComplete: () => void;
}

const normalizeText = (text: string): string => {
    return text.trim().toLowerCase().replace(/\W+/g, '').replace(/\s+/g, ' ');
};

const WritingCard = ({ card, onIncorrect, onComplete }: WritingCardProps) => {
    const [langs, setLangs] = useState<setQandALangsReturnType>(setQandALangs(card));
    const [userInput, setUserInput] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { t } = useTranslation();

    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Memoizing normalized answer to avoid unnecessary recalculations
    const normalizedAnswer = useMemo(() => normalizeText(card.answer), [card.answer]);

    useEffect(() => {
        const newLangs = setQandALangs(card);
        setLangs(newLangs);
    }, [card]);

    const setTheUserInput = (text: string) => {
        setIsCorrect(null);
        setUserInput(text);
    }

    const handleLetterButtonClick = (letter: string) => {
        setTheUserInput(userInput + letter);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleNextClick = () => {
        const normalizedUserInput = normalizeText(userInput);
        if (normalizedUserInput === normalizedAnswer) {
            setIsCorrect(true);
            onComplete();
        } else {
            setIsCorrect(false);
            onIncorrect();
        }
    };

    return (
        <>
            <section className='card writing-card'>
                <h4>{t('translate_to_lang', { lang: t(langs.a) })}</h4>
                <h3 lang={langs.q}>{card.question}</h3>

                <textarea
                    className='answer'
                    placeholder={t('type_in') + ' ' + t(langs.a) + '...'}
                    ref={inputRef}
                    lang={langs.a}
                    value={userInput}
                    autoFocus={true}
                    onChange={(e) => setTheUserInput(e.target.value)}
                    aria-label={t('enter_answer')}
                />

                {langs.a === 'ang' && (
                    <LetterButtons
                        lang={langs.a}
                        onSelect={handleLetterButtonClick}
                    />
                )}

            </section>

            {userInput.length > 0 && (
                <button
                    className={isCorrect === false ? 'try-again-button' : 'next-button'}
                    onClick={handleNextClick}
                    aria-label={userInput.length > 0 && isCorrect === null ? t('try_again') : t('next')}
                >
                    {userInput.length > 0 && isCorrect === false ? t('try_again') : t('next')}
                </button>
            )}
        </>
    );
};

export default WritingCard;
