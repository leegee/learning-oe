import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { type Card } from './Card.ts';
import { setQandALangs, setQandALangsReturnType } from '../../lib/set-q-and-a-langs.ts';
import './WritingBlocksCard.css';

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
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        setLangs(setQandALangs(card));
        setSelectedWords([]); // Reset selected words on new card
        setIsCorrect(null); // Reset correctness
    }, [card]);

    const handleWordClick = (word: string) => {
        setSelectedWords((prev) => [...prev, word]);
    };

    const handleRemoveWord = (index: number) => {
        setSelectedWords((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCheckAnswer = () => {
        const normalizedUserInput = normalizeText(selectedWords.join(' '));
        const normalizedAnswer = normalizeText(card.answer);

        if (normalizedUserInput === normalizedAnswer) {
            setIsCorrect(true);
            onCorrect();
        } else {
            setIsCorrect(false);
            onIncorrect();
        }
    };

    return (
        <>
            <section className='writing-blocks-card'>
                <h3 className="question" lang={langs.q}>{card.question}</h3>

                <div className='selected-words'>
                    {selectedWords.map((word, index) => (
                        <button key={index} className='selected-word' onClick={() => handleRemoveWord(index)}>
                            {word}
                        </button>
                    ))}
                </div>

                <div className='options'>
                    {card.options.map((word, index) => (
                        <button
                            key={index}
                            className='option-button'
                            onClick={() => handleWordClick(word)}
                            disabled={selectedWords.includes(word)} // Disable if already selected
                        >
                            {word}
                        </button>
                    ))}
                </div>
            </section>

            {selectedWords.length > 0 && !isCorrect && (
                <button className='next-button' onClick={handleCheckAnswer}>
                    {isCorrect === null ? t('next') : t('try_again')}
                </button>
            )}

            {isCorrect === true && (
                <button className='next-button' onClick={onComplete}>
                    {t('continue')}
                </button>
            )}
        </>
    );
};

export default WritingBlocksCard;
