import { useTranslation } from "react-i18next";
import LessonList from "./LessonList";
import './CompletedAllLessons.css';

interface CompletionSummaryProps {
    totalQuestions: number;
    totalLessons: number;
    totalIncorrectAnswers: number;
}

const CompletedAllLessons = ({ totalQuestions, totalLessons, totalIncorrectAnswers, }: CompletionSummaryProps) => {
    const { t } = useTranslation();

    return (
        <>
            <section className="completed-all-lessons">
                <h2>{t('all_lessons_done')}</h2>
                <p>{t('total_questions_answered')}: <strong>{totalQuestions}</strong></p>
                <p>{t('total_lessons_completed')}: <strong>{totalLessons}</strong></p>
                <p>{t('total_incorrect_answers')}: <strong>{totalIncorrectAnswers}</strong></p>
            </section>

            <LessonList />
        </>
    );
};

export default CompletedAllLessons;
