import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import './LessonIntro.css';

interface LessonIntroProps {
    title: string;
    index: number;
    children?: ReactNode;
    onContinue: () => void;
}

const LessonIntro = ({ title, index, children, onContinue }: LessonIntroProps) => {
    const { t } = useTranslation();

    return (
        <>
            <article className="lesson-intro">
                <h3>
                    {t('lesson')} {index + 1}
                </h3>
                <h2>{title}</h2>
                <div className="buttons">
                    <button className='next-button' onClick={onContinue}>{t('begin')}</button>
                </div>

                {children && (
                    <>
                        <hr />
                        {children}
                    </>
                )}


            </article >

        </>
    );
};

export default LessonIntro;
