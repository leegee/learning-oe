// components/LessonList.tsx

import { useTranslation } from "react-i18next";
import { LessonSummary } from "../Lessons";
import './LessonList.css';

interface LessonListProps {
    lessons: LessonSummary[];
    currentLessonIndex: number;
    onLessonSelected: (lessonIndex: number) => void;
}

const LessonList = ({ lessons, currentLessonIndex, onLessonSelected }: LessonListProps) => {
    const { t } = useTranslation();

    return (
        <section className="lesson-list">
            <h2>{t('lessons')}</h2>
            <ol >
                {lessons.map((lessonSummary, index) => (
                    <li key={index}>
                        <button onClick={() => { if (index < currentLessonIndex) { onLessonSelected(index) } }}
                            className={[
                                index < currentLessonIndex && 'completed',
                                index === currentLessonIndex && 'current',
                                index > currentLessonIndex && 'todo'
                            ].filter(Boolean).join(' ')}
                        >
                            <span className='index'>{index + 1}</span>
                            {lessonSummary.title}
                        </button>
                    </li>
                ))}
            </ol>
        </section >

    );
};

export default LessonList;
