// components/LessonList.tsx

import { useTranslation } from "react-i18next";
import { LessonSummary } from "../Lessons";
import './LessonList.css';

interface LessonListProps {
    lessons: LessonSummary[];
    currentLessonIndex: number;
}

const LessonList = ({ lessons, currentLessonIndex }: LessonListProps) => {
    const { t } = useTranslation();

    return (
        <section className="lesson-list">
            <h2>{t('lessons')}</h2>
            <ol>
                {lessons.map((lessonSummary, index) => (
                    <li key={index}>
                        <span className='list-marker'>
                            {index < currentLessonIndex ? '✔️' : ''}
                            {index === currentLessonIndex ? '👉' : ''}
                            {index > currentLessonIndex ? '.' : ''}
                        </span>
                        <span className='index'>{index + 1}</span>
                        {lessonSummary.title}
                    </li>
                ))}
            </ol>
        </section>

    );
};

export default LessonList;
