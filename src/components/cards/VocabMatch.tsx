import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { shuffleArray } from '../../lib/shuffle-array.ts'
import { type Card } from './Card.ts';
import { setQandALangs, setQandALangsReturnType } from '../../lib/set-q-and-a-langs.ts';
import './VocabMatch.css';

export type VocabCard = Card & {
    class: 'vocab';
    vocab: { [key: string]: string }[]; // Each entry is a key-value pair of word translation
};

interface VocabMatchProps {
    card: VocabCard;
    onIncorrect: () => void;
    onComplete: () => void;
}

const VocabMatch = ({ card, onIncorrect, onComplete }: VocabMatchProps) => {
    const [langs, setLangs] = useState<setQandALangsReturnType>(setQandALangs(card.qlang));
    const [shuffledRightColumn, setShuffledRightColumn] = useState<string[]>([]);
    const [selectedLeftWord, setSelectedLeftWord] = useState<string | null>(null);
    const [selectedRightWord, setSelectedRightWord] = useState<string | null>(null);
    const [correctMatches, setCorrectMatches] = useState<{ [key: string]: string }>({});
    const [shakeRightWord, setShakeRightWord] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const rightColumn = card.vocab.map((pair) => Object.values(pair)[0]);
        setShuffledRightColumn(shuffleArray(rightColumn));
        setLangs(setQandALangs(card.qlang));
    }, [card.vocab]);

    const processMatch = (leftWord: string, rightWord: string) => {
        const correctMatch = card.vocab.find((pair) => pair[leftWord] === rightWord);

        if (correctMatch) {
            setCorrectMatches((prev) => ({ ...prev, [leftWord]: rightWord }));
        } else {
            setShakeRightWord(rightWord);
            setTimeout(() => setShakeRightWord(null), 1000);
            onIncorrect();
        }

        // Reset selections after processing
        setSelectedLeftWord(null);
        setSelectedRightWord(null);
    };

    const handleQuestionClick = (leftWord: string) => {
        if (selectedLeftWord === leftWord) {
            setSelectedLeftWord(null);
        } else {
            setSelectedLeftWord(leftWord);
        }

        if (selectedRightWord) {
            processMatch(leftWord, selectedRightWord);
        }
    };

    const handleAnswerClick = (rightWord: string) => {
        if (selectedRightWord === rightWord) {
            setSelectedRightWord(null);
        } else {
            setSelectedRightWord(rightWord);
        }

        if (selectedLeftWord) {
            processMatch(selectedLeftWord, rightWord);
        }
    };

    useEffect(() => {
        if (Object.keys(correctMatches).length === card.vocab.length) {
            setIsComplete(true);
        }
    }, [correctMatches, card.vocab.length]);

    const handleNextClick = () => {
        if (isComplete) {
            onComplete();
        }
    };

    return (
        <>
            <section className="card vocab-match">
                <h3 lang={langs.q}>{card.question}</h3>
                <table>
                    <tbody>
                        {card.vocab.map((pair, index) => {
                            const leftWord = Object.keys(pair)[0];
                            const correctRightWord = Object.values(pair)[0];
                            const shuffledRightWord = shuffledRightColumn[index];

                            const isMatched = correctMatches[leftWord] === correctRightWord;
                            const isRightMatched = Object.values(correctMatches).includes(shuffledRightWord);

                            return (
                                <tr key={index}>
                                    <td>
                                        <button
                                            lang={langs.q}
                                            className={`vocab-match left-word 
                                            ${isMatched ? 'matched' : ''} 
                                            ${selectedLeftWord === leftWord ? 'selected' : ''}`}
                                            onClick={() => handleQuestionClick(leftWord)}
                                        >
                                            {leftWord}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            lang={langs.a}
                                            className={`vocab-match right-word 
                                            ${isRightMatched ? 'matched' : ''} 
                                            ${selectedRightWord === shuffledRightWord ? 'selected' : ''}
                                            ${shakeRightWord === shuffledRightWord ? 'shake' : ''}`}
                                            onClick={() => handleAnswerClick(shuffledRightWord)}
                                        >
                                            {shuffledRightWord}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>

            {isComplete && (
                <button className="next-button" onClick={handleNextClick}>
                    {t('next')}
                </button>
            )}
        </>
    );
};

export default VocabMatch;
