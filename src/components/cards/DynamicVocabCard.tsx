// DynamicVocabCard

import { Card } from "./Card";
import { Lesson } from "../../Lessons";
import VocabMatch, { VocabCard } from "./VocabMatch";

export type DynamicVocabCard = Card & {
    class: 'dynamic-vocab';
    qlang: string;
};

interface DynamicVocabCardProps {
    card: DynamicVocabCard;
    lesson: Lesson;
    onIncorrect: () => void;
    onComplete: () => void;
}

const DynamicVocab = ({ card, lesson, onIncorrect, onComplete }: DynamicVocabCardProps) => {
    console.log(lesson.cards);

    let vocab: { [key: string]: string } = {};

    for (let thisCard of lesson.cards.filter(card => ['vocab', 'blanks'].includes(card.class))) {
        if (thisCard.class === 'blanks') {
            continue;
        }

        else if (thisCard.class === 'vocab') {
            if (thisCard.qlang === card.qlang) {
                // Merging vocab in the same order for the same language
                Object.assign(vocab, thisCard.vocab);
            } else {
                // Swapping keys and values when languages are different
                const swappedVocab = Object.fromEntries(
                    Object.entries(thisCard.vocab).map(([key, value]) => [value, key])
                );
                Object.assign(vocab, swappedVocab);
            }
        }
    }

    const newCard: VocabCard = {
        class: 'vocab',
        qlang: card.qlang,
        vocab: vocab
    };

    return (
        <>
            <VocabMatch
                card={newCard}
                onIncorrect={onIncorrect}
                onComplete={onComplete}
            />
        </>
    );
};

export default DynamicVocab;
