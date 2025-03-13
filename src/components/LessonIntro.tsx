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

                <section className="card about">
                    <h2>About</h2>
                    <p>
                        This little app was written in under a week to help me
                        learn a little Old English, but written in such a way
                        that it can easily be reconfigured with just a text editor
                        to quiz the user on any subject.
                    </p>
                    <footer>
                        &mdash; <a title='E-mail' href='mailto:leegee@gmail.com'>Lee Goddard</a>, Gödöllő, 2025
                    </footer>
                </section>
            </article >

        </>
    );
};

export default LessonIntro;
