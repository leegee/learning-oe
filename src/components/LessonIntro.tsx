import { useTranslation } from "react-i18next";
import './LessonIntro.css';

interface LessonIntroProps {
    title: string;
    onContinue: () => void;
    onBack: () => void;
}

const LessonIntro = ({ title, onContinue, onBack, }: LessonIntroProps) => {
    const { t } = useTranslation();

    return (
        <div className="lesson-intro">
            <h2>{title}</h2>
            <div className="buttons">
                <button onClick={onBack}>{t('back')}</button>
                <button onClick={onContinue}>{t('continue')}</button>
            </div>
        </div>
    );
};

export default LessonIntro;
