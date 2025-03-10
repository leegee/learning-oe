// src/components/VocabMatch.tsx
import { useState, useEffect } from 'react';
import './VocabMatch.css';

interface VocabMatchProps {
    question: string;
    vocab: { [lang1: string]: string }[];
    onComplete: () => void;
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const VocabMatch = ({ question, vocab, onComplete }: VocabMatchProps) => {
    const [shuffledRightColumn, setShuffledRightColumn] = useState<string[]>([]);
    const [selectedPair, setSelectedPair] = useState<[string, string] | null>(null);
    const [correctMatches, setCorrectMatches] = useState<{ [key: string]: string }>({});
    const [isComplete, setIsComplete] = useState(false);

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
                                        className={`left-word ${isMatched ? 'matched' : ''}`}
                                        onClick={() => handleLeftClick(leftWord)}
                                    >
                                        {leftWord}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={`right-word ${isRightMatched ? 'matched' : ''}`}
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
                    Next
                </button>
            )}
        </section>
    );
};

export default VocabMatch;
