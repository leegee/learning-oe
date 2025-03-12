import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import './CompletedAllLessons.css';

interface CompletionSummaryProps {
    totalQuestions: number;
    totalLessons: number;
    totalIncorrectAnswers: number;
    children: ReactNode;  // This allows passing child components
}

const CompletedAllLessons = ({
    totalQuestions,
    totalLessons,
    totalIncorrectAnswers,
    children,  // The child component is passed here
}: CompletionSummaryProps) => {
    const { t } = useTranslation();

    return (
        <>
            <section className="completed-all-lessons">
                <h2>{t('all_lessons_done')}</h2>
                <p>{t('total_questions_answered')}: <strong>{totalQuestions}</strong></p>
                <p>{t('total_lessons_completed')}: <strong>{totalLessons}</strong></p>
                <p>{t('total_incorrect_answers')}: <strong>{totalIncorrectAnswers}</strong></p>
            </section>

            {children}
        </>
    );
};

export default CompletedAllLessons;
