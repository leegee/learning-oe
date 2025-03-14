import { useRef, useMemo, useState, useEffect } from 'react';
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
    const [langs, setLangs] = useState<setQandALangsReturnType>(setQandALangs(card));
    const [userInput, setUserInput] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [buttonText, setButtonText] = useState<string>('');  // Separate state for button text
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
            setButtonText(t('next'));
            onComplete();
        } else {
            setIsCorrect(false);
            setButtonText(t('try_again'));
            onIncorrect();
        }
    };

    useEffect(() => {
        // Ensure the button text is set to 'Next' when user input exists but hasn't been evaluated yet
        if (userInput.length > 0 && isCorrect === null) {
            setButtonText(t('next'));
        }
    }, [userInput, isCorrect, t]);

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
                    <div className="letter-buttons">
                        {OldEnglishLetters.map((letter, index) => (
                            <button
                                key={index}
                                onClick={() => handleLetterButtonClick(letter.symbol)}
                                aria-label={t(`insert_${letter.name}`)}
                            >
                                {letter.symbol}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {userInput.length > 0 && (
                <button
                    className={isCorrect === false ? 'try-again-button' : 'next-button'}
                    onClick={handleNextClick}
                    aria-label={isCorrect === false ? t('try_again') : t('next')}
                >
                    {buttonText || t('submit')}
                </button>
            )}
        </>
    );
};

export default WritingCard;
