import { useRef, useMemo, useState, } from 'react';
import { useTranslation } from "react-i18next";

import { type Card } from './Card.ts';
import { setQandALangs, setQandALangsReturnType } from '../../lib/set-q-and-a-langs.ts';
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

const OldEnglishLetters = [
    { symbol: 'æ', name: 'ash' },
    { symbol: 'ø', name: 'o-slash' },
    { symbol: 'þ', name: 'thorn' },
    { symbol: 'ð', name: 'eth' },
    { symbol: 'ȝ', name: 'yogh' },
    { symbol: 'œ', name: 'o-e' },
    { symbol: 'ſ', name: 'long-s' },
    { symbol: 'ƿ', name: 'wynn' },
    { symbol: 'ā', name: 'long-a' },
    { symbol: 'ē', name: 'long-e' },
    { symbol: 'ī', name: 'long-i' },
    { symbol: 'ō', name: 'long-o' },
    { symbol: 'ū', name: 'long-u' },
    { symbol: 'ȳ', name: 'long-y' }
];

const normalizeText = (text: string): string => {
    return text.trim().toLowerCase().replace(/\W+/g, '').replace(/\s+/g, ' ');
};

const WritingCard = ({ card, onIncorrect, onComplete }: WritingCardProps) => {
    const [langs] = useState<setQandALangsReturnType>(setQandALangs(card.qlang));
    const [userInput, setUserInput] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { t } = useTranslation();

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const normalizedAnswer = useMemo(() => normalizeText(card.answer), [card.answer]);

    const handleLetterButtonClick = (letter: string) => {
        setUserInput(prevInput => prevInput + letter);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleNextClick = () => {
        const normalizedUserInput = normalizeText(userInput);
        setUserInput('');
        console.log(normalizedUserInput, normalizedAnswer)
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
                <h3 lang={langs.q}>{card.question}</h3>
                <textarea
                    className='answer'
                    placeholder={t('type_in') + ' ' + t(langs.a) + '...'}
                    ref={inputRef}
                    lang={langs.a}
                    value={userInput}
                    autoFocus={true}
                    onChange={(e) => setUserInput(e.target.value)}
                />

                {langs.a === 'ang' && <div className="letter-buttons">
                    {OldEnglishLetters.map((letter, index) => (
                        <button
                            title={letter.name}
                            key={index}
                            onClick={() => handleLetterButtonClick(letter.symbol)}
                        >
                            {letter.symbol}
                        </button>
                    ))}
                </div>}
            </section>

            <button
                className={isCorrect ? 'next-button' : 'try-again-button'}
                onClick={handleNextClick}
            >
                {isCorrect === false ? t('try_again') : t('next')}
            </button>
        </>
    );
};

export default WritingCard;
