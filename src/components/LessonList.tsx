// components/dialogs/LessonList.tsx

import { useTranslation } from "react-i18next";
import { LessonSummary } from "../Lessons";
import ConfirmDialog from "./dialogs/Confirm";
import './LessonList.css';
import { useState } from "react";

interface LessonListProps {
    lessons: LessonSummary[];
    currentLessonIndex: number;
    onLessonSelected: (lessonIndex: number) => void;
}

const LessonList = ({ lessons, currentLessonIndex, onLessonSelected }: LessonListProps) => {
    const { t } = useTranslation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [lessonIndexToChange, setLessonIndexToChange] = useState<number | null>(null);

    const onLessonSelectedLocal = (lessonIndex: number) => {
        setLessonIndexToChange(lessonIndex);
        setIsDialogOpen(true);
    };

    const handleConfirmChangeLesson = () => {
        setIsDialogOpen(false);
        if (lessonIndexToChange !== null) {
            onLessonSelected(lessonIndexToChange);
        }
    };

    const handleCancelChangeLesson = () => {
        setLessonIndexToChange(null);
        setIsDialogOpen(false);
    };

    return (
        <>
            <section className="card lesson-list">
                <h2>{t('list_lessons_title')}</h2>
                <ol >
                    {lessons.map((lessonSummary, index) => (
                        <li key={index}>
                            <button
                                {...(index > currentLessonIndex && { disabled: true })}
                                onClick={() => { if (index < currentLessonIndex) { onLessonSelectedLocal(index) } }}
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

            <ConfirmDialog
                isOpen={isDialogOpen}
                message={t('will_you_learn_lesson_n', { n: lessonIndexToChange !== null ? lessonIndexToChange + 1 : 1 })}
                onConfirm={handleConfirmChangeLesson}
                onCancel={handleCancelChangeLesson}
            />
        </>
    );
};

export default LessonList;
