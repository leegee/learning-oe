import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { type Card } from './Card.ts';
import { setQandALangs, setQandALangsReturnType } from '../../lib/set-q-and-a-langs.ts';
import './WritingCard.css';

export type WritingBlocksCard = Card & {
    class: 'writing-blocks';
    answer: string;
    options: string[];
};

interface WritingBlocksCardProps {
    card: WritingBlocksCard;
    onCorrect: (numberOfCorrectAnswers?: number) => void;
    onIncorrect: () => void;
    onComplete: () => void;
}

const normalizeText = (text: string): string => {
    return text.trim().toLowerCase().replace(/\W+/g, '').replace(/\s+/g, ' ');
};

const WritingBlocksCard = ({ card, onCorrect, onIncorrect, onComplete }: WritingBlocksCardProps) => {
    const [langs, setLangs] = useState<setQandALangsReturnType>(setQandALangs(card));
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        setLangs(setQandALangs(card));
        setSelectedWords([]); // Reset on new card
    }, [card]);

    const handleWordClick = (word: string) => {
        setSelectedWords([...selectedWords, word]);
    };

    const handleRemoveWord = (index: number) => {
        setSelectedWords(selectedWords.filter((_, i) => i !== index));
    };

    const handleCheckAnswer = () => {
        const normalizedUserInput = normalizeText(selectedWords.join(' '));
        const normalizedAnswer = normalizeText(card.answer);
        if (normalizedUserInput === normalizedAnswer) {
            onCorrect();
            onComplete();
        } else {
            onIncorrect();
        }
    };

    return (
        <>
            <section className='card writing-card'>
                <h3 lang={langs.q}>{card.question}</h3>

                <div className='selected-words'>
                    {selectedWords.map((word, index) => (
                        <button key={index} className='selected-word' onClick={() => handleRemoveWord(index)}>
                            {word}
                        </button>
                    ))}
                </div>

                <div className='options'>
                    {card.options.map((word, index) => (
                        <button key={index} className='option-button' onClick={() => handleWordClick(word)}>
                            {word}
                        </button>
                    ))}
                </div>
            </section>

            {selectedWords.length > 0 && (
                <button className='next-button' onClick={handleCheckAnswer}>
                    {t('check_answer')}
                </button>
            )}
        </>
    );
};

export default WritingBlocksCard;
