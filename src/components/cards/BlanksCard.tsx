// BlanksCard.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { shuffleArray } from '../../lib/shuffle-array.ts';
import { type Card } from './Card.ts';
import { setQandALangs, setQandALangsReturnType } from '../../lib/set-q-and-a-langs.ts';
import './BlanksCard.css';

export type BlanksCard = Card & {
    class: 'blanks';
    words: { word: string; correct: boolean }[]; // Array of words with a correct boolean flag
};

interface BlanksCardProps {
    card: BlanksCard;
    onIncorrect: () => void;
    onComplete: () => void;
}

const BlanksCard = ({ card, onIncorrect, onComplete }: BlanksCardProps) => {
    const [langs, setLangs] = useState<setQandALangsReturnType>(setQandALangs(card.qlang));
    const [shuffledWords, setShuffledWords] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [currentSentence, setCurrentSentence] = useState<string>(card.question);
    const [shake, setShake] = useState<string | null>(null);

    const { t } = useTranslation();

    useEffect(() => {
        setShuffledWords(shuffleArray(card.words.map(word => word.word)));
        setLangs(setQandALangs(card.qlang));
    }, [card.words]);

    // Handle word selection and updating sentence
    const handleWordClick = (word: string) => {
        // Find the index of the first blank (__) that needs to be filled
        const firstBlankIndex = currentSentence.indexOf('__');

        // If there's no blank, don't proceed
        if (firstBlankIndex === -1) {
            return;
        }

        // Check if the word is correct and if it follows the selected order
        const isCorrect = card.words.find((item) => item.word === word && item.correct);

        if (isCorrect && selectedWords.length < card.words.filter(word => word.correct).length) {
            // Ensure the selected word matches the next blank's expected word in the correct order
            const expectedWord = card.words.filter(word => word.correct)[selectedWords.length].word;

            if (word === expectedWord) {
                setSelectedWords((prev) => [...prev, word]);

                // Replace the first occurrence of underscores (__) with the selected word
                let updatedSentence = currentSentence;
                updatedSentence = updatedSentence.replace(/__+/, word);
                setCurrentSentence(updatedSentence);
            }
            else {
                // alert('Please select the words in the correct order!');
                onIncorrect();
            }
        } else if (!isCorrect) {
            setShake(word);
            setTimeout(() => setShake(null), 1000);
            onIncorrect();
        }
    };

    // Check if all correct words are selected in the correct order
    useEffect(() => {
        const correctOrder = card.words.filter(word => word.correct).map(item => item.word);
        if (selectedWords.length === correctOrder.length && selectedWords.every((word, index) => word === correctOrder[index])) {
            setIsComplete(true);
        }
    }, [selectedWords, card]);

    const handleNextClick = () => {
        if (isComplete) {
            onComplete();
        }
    };

    return (
        <>
            <section className="card blanks-card">
                <h3 lang={langs.q}>{currentSentence}</h3>
                <div className="word-options">
                    {shuffledWords.map((word, index) => {
                        const isSelected = selectedWords.includes(word);
                        const isCorrect = card.words.find((item) => item.word === word && item.correct);

                        // Apply the coloring logic only after the word is selected
                        return (
                            <button
                                key={index}
                                lang={langs.a}
                                onClick={() => handleWordClick(word)}
                                disabled={isSelected}
                                className={
                                    `word-option 
                                    ${isSelected ? isCorrect ? 'correct' : 'incorrect' : ''}
                                    ${shake === word ? 'shake' : ''}
                                `}
                            >
                                {word}
                            </button>
                        );
                    })}
                </div>
            </section>

            {isComplete && (
                <button className="next-button" onClick={handleNextClick}>
                    {t('next')}
                </button>
            )}
        </>
    );
};

export default BlanksCard;
