// src/components/VocabMatch.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { shuffleArray } from '../../lib/shuffle-array.ts'
import './VocabMatch.css';

interface VocabMatchProps {
    question: string;
    vocab: { [lang1: string]: string }[];
    onIncorrect: () => void;
    onComplete: () => void;
}


const VocabMatch = ({ question, vocab, onIncorrect, onComplete }: VocabMatchProps) => {
    const [shuffledRightColumn, setShuffledRightColumn] = useState<string[]>([]);
    const [selectedPair, setSelectedPair] = useState<[string, string] | null>(null);
    const [correctMatches, setCorrectMatches] = useState<{ [key: string]: string }>({});
    const [isComplete, setIsComplete] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const rightColumn = vocab.map((pair) => Object.values(pair)[0]);
        setShuffledRightColumn(shuffleArray(rightColumn));
    }, [vocab]);

    const handleLeftClick = (leftWord: string) => {
        if (selectedPair) {
            setSelectedPair([leftWord, selectedPair[1]]);
        } else {
            setSelectedPair([leftWord, '']);
        }
    };

    const handleRightClick = (rightWord: string) => {
        if (selectedPair) {
            const [leftWord] = selectedPair;
            const correctMatch = vocab.find((pair) => pair[leftWord] === rightWord);
            if (correctMatch) {
                setCorrectMatches((prev) => ({ ...prev, [leftWord]: rightWord }));
            } else {
                onIncorrect();
            }
            setSelectedPair(null);
        } else {
            setSelectedPair(['', rightWord]);
        }
    };

    useEffect(() => {
        if (Object.keys(correctMatches).length === vocab.length) {
            setIsComplete(true);
        }
    }, [correctMatches, vocab.length]);

    const handleNextClick = () => {
        if (isComplete) {
            onComplete();
        }
    };

    return (
        <section className="card vocab-match">
            <h3>{question}</h3>
            <table>
                <tbody>
                    {vocab.map((pair, index) => {
                        const leftWord = Object.keys(pair)[0];
                        const correctRightWord = Object.values(pair)[0];
                        const shuffledRightWord = shuffledRightColumn[index];

                        const isMatched = correctMatches[leftWord] === correctRightWord;

                        const isRightMatched = Object.values(correctMatches).includes(shuffledRightWord);

                        return (
                            <tr key={index}>
                                <td>
                                    <button
                                        className={`vocab-match left-word ${isMatched ? 'matched' : ''}`}
                                        onClick={() => handleLeftClick(leftWord)}
                                    >
                                        {leftWord}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={`vocab-match right-word ${isRightMatched ? 'matched' : ''}`}
                                        onClick={() => handleRightClick(shuffledRightWord)}
                                    >
                                        {shuffledRightWord}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {isComplete && (
                <button className="next-button" onClick={handleNextClick}>
                    {t('next')}
                </button>
            )}
        </section>
    );
};

export default VocabMatch;
