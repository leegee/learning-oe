import { useTranslation } from "react-i18next";

interface LessonCompletedComponent {
    questionCount: number;
    mistakeCount: number;
    onContinue: () => void;
}

const LessonCompletedComponent = ({ questionCount, mistakeCount, onContinue }: LessonCompletedComponent) => {
    const { t } = useTranslation();

    return (
        <>
            <section className='card'>
                <h2>{t('lesson_completed')}</h2>

                <p>{t('lesson_completed_counts', { questionCount, mistakeCount })}</p>
            </section>
            <button className='next-button' onClick={onContinue}>{t('next_lesson')}</button>
        </>
    );
}

export default LessonCompletedComponent;