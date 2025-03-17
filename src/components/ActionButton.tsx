import { useTranslation } from "react-i18next";

import './ActionButton.css';

interface ButtonProps {
    isCorrect: boolean | null;
    isInputPresent: boolean;
    onCheckAnswer: () => void;
    onComplete: () => void;
}

const ActionButton = ({ isCorrect, isInputPresent, onCheckAnswer, onComplete, }: ButtonProps) => {
    const { t } = useTranslation();

    const handleClick = () => {
        if (isCorrect === true) {
            onComplete();
        } else {
            onCheckAnswer();
        }
    };

    return (
        <button
            className={
                isCorrect === null
                    ? 'next-button'
                    : isCorrect === false
                        ? 'try-again-button'
                        : 'next-button'
            }
            onClick={handleClick}
            disabled={!isInputPresent}
        >
            {isCorrect === null
                ? t('next')
                : isCorrect === true
                    ? t('correct_next')
                    : t('try_again')}
        </button>
    );
};

export default ActionButton;