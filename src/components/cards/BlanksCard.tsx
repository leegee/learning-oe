import { useState, useEffect } from 'react';
import './BlanksCard.css';
import { shuffleArray } from '../../lib/shuffle-array.ts';

interface BlanksCardProps {
    question: string;
    words: { word: string; correct: boolean }[]; // Array of words with correct boolean
    onComplete: () => void;
}

const BlanksCard = ({ question, words, onComplete }: BlanksCardProps) => {
    const [shuffledWords, setShuffledWords] = useState<string[]>([]); // Shuffled words to display
    const [selectedWords, setSelectedWords] = useState<string[]>([]); // Track selected words in order
    const [isComplete, setIsComplete] = useState(false); // To check if the task is complete
    const [currentSentence, setCurrentSentence] = useState<string>(question); // Sentence with inserted words

    // Shuffle words when the component is mounted or words change
    useEffect(() => {
        setShuffledWords(shuffleArray(words.map(word => word.word)));
    }, [words]);

    // Handle word selection and updating sentence
    const handleWordClick = (word: string) => {
        // Check if the word is correct
        const isCorrect = words.find((item) => item.word === word && item.correct);

        if (isCorrect && selectedWords.length < words.filter(word => word.correct).length) {
            setSelectedWords((prev) => [...prev, word]);

            // Replace the next sequence of underscores (__) in the sentence with the selected word
            let updatedSentence = currentSentence;

            // Replace the next occurrence of one or more underscores (using __+)
            updatedSentence = updatedSentence.replace(/__+/,
                (match) => {
                    if (selectedWords.length < words.filter(word => word.correct).length) {
                        return word; // Replace the first sequence of underscores with the selected word
                    }
                    return match; // Return the original match if no more words to fill
                });

            setCurrentSentence(updatedSentence);
        } else if (!isCorrect) {
            alert('Incorrect word, try again!');
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
            <h3>{currentSentence}</h3> {/* Display the current sentence with blanks replaced */}
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
                    Next
                </button>
            )}
        </section>
    );
};

export default BlanksCard;
