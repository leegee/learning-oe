/*
  For reasons of future compatability, better or worse, this component manages all navigation without react-router or react-router-native or native-stack.

  For the same reason, access to state data is also managed here.
  
*/

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { lessons, lessonTitles2Indicies } from "./Lessons";
import LessonComponent from "./components/Lesson";
import LessonIntro from "./components/LessonIntro";
import CompletedAllLessons from "./components/CompletedAllLessons";
import config from "./config";
import LessonList from "./components/LessonList";
import * as state from "./Lessons/state";

import "./App.css";

const App: React.FC = () => {
  const initialLessonIndex = state.loadCurrentLesson();
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(initialLessonIndex);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>(state.loadIncorrectAnswers(currentLessonIndex));
  const [allCompleted, setAllCompleted] = useState<boolean>(initialLessonIndex >= lessons.length);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    setIncorrectAnswers(state.loadIncorrectAnswers(currentLessonIndex));
    setAllCompleted(currentLessonIndex >= lessons.length);
    setShowIntro(true);
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

  const goBackLesson = () => {
    if (currentLessonIndex > 0) {
      const prevLessonIndex = currentLessonIndex - 1;
      setCurrentLessonIndex(prevLessonIndex);
      state.saveCurrentLesson(prevLessonIndex);
    }
  };

  const totalQuestionsAnswered = lessons.reduce((sum, lesson) => sum + lesson.cards.length, 0);
  const currentLesson = lessons[currentLessonIndex];
  const totalIncorrectAnswers = state.countTotalIncorrectAnswers();

  return (
    <main>
      <header>
        <h1 lang={config.targetLanguage}>{config.target.apptitle}</h1>
        {incorrectAnswers &&
          <span className="incorrectAnswers" title={t('incorrect_answer_count_alt')}>
            {t('incorrect_answer_count')} {incorrectAnswers.length > 0 ? ` - ${incorrectAnswers.length}` : ''}
          </span>
        }
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

        <CompletedAllLessons
          totalQuestions={totalQuestionsAnswered}
          totalLessons={lessons.length}
          totalIncorrectAnswers={totalIncorrectAnswers}
        >
          <LessonList
            currentLessonIndex={currentLessonIndex}
            lessons={lessonTitles2Indicies()}
          />
        </CompletedAllLessons>

      ) : showIntro ? (

        <LessonIntro
          title={currentLesson.title}
          onContinue={() => setShowIntro(false)}
          onBack={goBackLesson}
        />

      ) : (

        <LessonComponent
          key={currentLessonIndex}
          lesson={currentLesson}
          onComplete={goToNextLesson}
          onIncorrectAnswer={onIncorrectAnswer}
        />

      )}
    </main>
  );
};

export default App;
