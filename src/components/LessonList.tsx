// components/LessonList.tsx

import { useTranslation } from "react-i18next";
import './LessonList.css';

interface LessonListProps {
}

const LessonList = ({ }: LessonListProps) => {
    const { t } = useTranslation();

    return (
        <section className="lesson-list">
            <h2>{t('lessons')}</h2>
        </section>

    );
};

export default LessonList;
