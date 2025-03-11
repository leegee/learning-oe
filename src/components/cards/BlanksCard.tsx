import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { shuffleArray } from '../../lib/shuffle-array.ts';
import './BlanksCard.css';

interface BlanksCardProps {
    question: string;
    words: { word: string; correct: boolean }[]; // Array of words with correct boolean
    onComplete: () => void;
}

const BlanksCard = ({ question, words, onComplete }: BlanksCardProps) => {
    const [shuffledWords, setShuffledWords] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [currentSentence, setCurrentSentence] = useState<string>(question); // Sentence with inserted words
    const { t } = useTranslation();

    useEffect(() => {
        setShuffledWords(shuffleArray(words.map(word => word.word)));
    }, [words]);

    // Handle word selection and updating sentence
    const handleWordClick = (word: string) => {
        // Find the index of the first blank (__) that needs to be filled
        const firstBlankIndex = currentSentence.indexOf('__');

        // If there's no blank, don't proceed
        if (firstBlankIndex === -1) {
            return;
        }

        // Check if the word is correct and if it follows the selected order
        const isCorrect = words.find((item) => item.word === word && item.correct);

        if (isCorrect && selectedWords.length < words.filter(word => word.correct).length) {
            // Ensure the selected word matches the next blank's expected word in the correct order
            const expectedWord = words.filter(word => word.correct)[selectedWords.length].word;

            if (word === expectedWord) {
                setSelectedWords((prev) => [...prev, word]);

                // Replace the first occurrence of underscores (__) with the selected word
                let updatedSentence = currentSentence;
                updatedSentence = updatedSentence.replace(/__+/, word);

                setCurrentSentence(updatedSentence);
            } else {
                alert('Please select the words in the correct order!');
            }
        } else if (!isCorrect) {
            // TODO UI
            alert(t('try_again'));
        }
    };

    // Check if all correct words are selected in the correct order
    useEffect(() => {
        const correctOrder = words.filter(word => word.correct).map(item => item.word);
        if (selectedWords.length === correctOrder.length && selectedWords.every((word, index) => word === correctOrder[index])) {
            setIsComplete(true);
        }
    }, [selectedWords, words]);

    const handleNextClick = () => {
        if (isComplete) {
            onComplete();
        }
    };

    return (
        <section className="card blanks-card">
            <h3>{currentSentence}</h3>
            <div className="word-options">
                {shuffledWords.map((word, index) => {
                    const isSelected = selectedWords.includes(word);
                    const isCorrect = words.find((item) => item.word === word && item.correct);

                    // We apply the coloring logic only after the word is selected
                    return (
                        <button
                            key={index}
                            className={`word-option ${isSelected ? isCorrect ? 'correct' : 'incorrect' : ''}`}
                            onClick={() => handleWordClick(word)}
                            disabled={isSelected}
                        >
                            {word}
                        </button>
                    );
                })}
            </div>

            {isComplete && (
                <button className="next-button" onClick={handleNextClick}>
                    {t('next')}
                </button>
            )}
        </section>
    );
};

export default BlanksCard;
