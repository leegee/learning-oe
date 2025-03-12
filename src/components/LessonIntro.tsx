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
                <section className="card">
                    <h2>
                        {t('lesson')} {index + 1}
                    </h2>
                    <h3>{title}</h3>
                    <div className="buttons">
                        <button className='next-button' onClick={onContinue}>{t('begin')}</button>
                    </div>
                </section>

                {children && (
                    <>
                        {children}
                    </>
                )}


            </article >

        </>
    );
};

export default LessonIntro;
