import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import './LessonIntro.css';

interface LessonIntroProps {
    title: string;
    index: number;
    children?: ReactNode;
    onContinue: () => void;
    onBack: () => void;
}

const LessonIntro = ({ title, index, children, onContinue, onBack, }: LessonIntroProps) => {
    const { t } = useTranslation();

    return (
        <>
            <article className="lesson-intro">
                <h3>
                    {t('lesson')} {index + 1}
                </h3>
                <h2>{title}</h2>
                <div className="buttons">
                    <button onClick={onBack}>{t('back')}</button>
                    <button className='next-button' onClick={onContinue}>{t('begin')}</button>
                </div>

                {children && children}

            </article>

        </>
    );
};

export default LessonIntro;
