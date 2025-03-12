import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import './CompletedAllLessons.css';

interface CompletionSummaryProps {
    totalQuestions: number;
    totalLessons: number;
    totalIncorrectAnswers: number;
    children: ReactNode;
}

const CompletedAllLessons = ({
    totalQuestions,
    totalLessons,
    totalIncorrectAnswers,
    children,
}: CompletionSummaryProps) => {
    const { t } = useTranslation();

    return (
        <>
            <article className="completed-all-lessons">
                <h2>{t('all_lessons_done')}</h2>
                <p>{t('total_questions_answered')}: <strong>{totalQuestions}</strong></p>
                <p>{t('total_lessons_completed')}: <strong>{totalLessons}</strong></p>
                <p>{t('total_incorrect_answers')}: <strong>{totalIncorrectAnswers}</strong></p>
            </article>

            {children}
        </>
    );
};

export default CompletedAllLessons;
