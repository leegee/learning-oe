import { useTranslation } from "react-i18next";
import './Stats.css';

interface StatsProps {
    incorrectAnswers: number;
    questionsAnswered: number;
}

const Stats = ({ incorrectAnswers, questionsAnswered }: StatsProps) => {
    const { t } = useTranslation();

    if (!incorrectAnswers && !questionsAnswered) {
        return '';
    }

    return (
        <span className="stats">
            <h2>{t('progress')}</h2>
            <span className="incorrect-answers" title={t('incorrect_answer_count_alt')}>
                <span className='incorrect-answer-alt'>
                    {t('incorrect_answer_count_alt')}
                </span>
                <span className='incorrect-answers-value'>
                    {incorrectAnswers}
                </span>
            </span>

            <span className="questions-answered" title={t('questions_answered_count_alt')}>
                <span className='questions-answered-alt'>
                    {t('questions_answered_count_alt')}
                </span>
                <span className='questions-answered-value'>
                    {questionsAnswered}
                </span>
            </span>
        </span >
    );
}

export default Stats;