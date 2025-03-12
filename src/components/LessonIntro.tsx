import { useTranslation } from "react-i18next";
import './LessonIntro.css';

interface LessonIntroProps {
    title: string;
    index: number;
    onContinue: () => void;
    onBack: () => void;
}

const LessonIntro = ({ title, index, onContinue, onBack, }: LessonIntroProps) => {
    const { t } = useTranslation();

    return (
        <div className="lesson-intro">
            <h3>
                {t('lesson')} {index + 1}
            </h3>
            <h2>{title}</h2>
            <div className="buttons">
                <button onClick={onBack}>{t('back')}</button>
                <button className='next-button' onClick={onContinue}>{t('begin')}</button>
            </div>
        </div>
    );
};

export default LessonIntro;
