import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { lessons } from './Lessons';
import LessonComponent from './components/Lesson';
import config from './config';
import * as state from './state';

import './App.css';

const App: React.FC = () => {
  const initialLessonIndex = state.loadCurrentLesson();
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(initialLessonIndex);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>(state.loadIncorrectAnswers(currentLessonIndex));
  const [allCompleted, setAllCompleted] = useState<boolean>(initialLessonIndex >= lessons.length);
  const { t } = useTranslation();

  // When the current lesson changes:
  useEffect(() => {
    setIncorrectAnswers(state.loadIncorrectAnswers(currentLessonIndex));
    setAllCompleted(currentLessonIndex >= lessons.length);
  }, [currentLessonIndex]);

  const onIncorrectAnswer = (incorrectAnswer: string) => {
    setIncorrectAnswers((prev = []) => {
      const updatedAnswers = [...prev, incorrectAnswer];
      state.saveIncorrectAnswers(currentLessonIndex, updatedAnswers);
      return updatedAnswers;
    });
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      const nextLessonIndex = currentLessonIndex + 1;
      setCurrentLessonIndex(nextLessonIndex);
      state.saveCurrentLesson(nextLessonIndex);
    } else {
      setAllCompleted(true);
    }
  };

  const currentLesson = lessons[currentLessonIndex];

  return (
    <main>
      <header>
        <h1 lang={config.targetLanguage}>{config.target.apptitle}</h1>
        <span className='incorrectAnswers' title={t('incorrect_answer_count_alt')}>
          {t('incorrect_answer_count')} {incorrectAnswers && '-' + incorrectAnswers.length}
        </span>
        <h2 lang={config.defaultLanguage}>{config.default.apptitle}</h2>
      </header>

      <aside>
        <progress
          value={currentLessonIndex}
          max={lessons.length}
          className="lesson-progress"
          aria-label={t('lesson_progress')}
          title={`${t('lesson')} ${currentLessonIndex + 1} / ${lessons.length}`}
        />
      </aside>

      {allCompleted ? (
        <p className="all-lessons-completed">{t('all_lessons_done')}</p>
      ) : (
        lessons.length > 0 && (
          <LessonComponent
            key={currentLessonIndex}
            lesson={currentLesson}
            onComplete={goToNextLesson}
            onIncorrectAnswer={onIncorrectAnswer}
          />
        )
      )}
    </main>
  );
};

export default App;
