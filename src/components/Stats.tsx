import { useTranslation } from "react-i18next";

interface StatsProps {
    incorrectAnswers: number;
    questionsAnswered: number;
}

const Stats = ({ incorrectAnswers, questionsAnswered }: StatsProps) => {
    const { t } = useTranslation();

    return (
        <span className="stats">

            {
                (incorrectAnswers && incorrectAnswers > 0) && (
                    <span className="incorrect-answers" title={t('incorrect_answer_count_alt')}>
                        {incorrectAnswers > 0 ? ` - ${incorrectAnswers}` : ''}
                    </span>
                )
            }

            {
                (questionsAnswered || questionsAnswered > 0) && (
                    <span className="questions-answered" title={t('questions_answered_alt')}>
                        {questionsAnswered}
                    </span>
                )
            }
        </span>
    );
}

export default Stats;