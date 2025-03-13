/*
  For reasons of future compatability, better or worse, this component manages all navigation without react-router or react-router-native or native-stack.

  For the same reason, access to state data is also managed here.
  
*/

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { lessons, lessonTitles2Indicies } from "./Lessons";
import LessonComponent from "./components/Lesson";
import LessonIntro from "./components/LessonIntro";
import LessonCompleted from "./components/LessonCompleted";
import CompletedAllLessons from "./components/CompletedAllLessons";
import config from "./config";
import LessonList from "./components/LessonList";
import * as state from "./Lessons/state";

import "./App.css";

const App: React.FC = () => {
  const initialLessonIndex = state.loadCurrentLesson();
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(initialLessonIndex);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>(state.loadIncorrectAnswers(currentLessonIndex));
  const [isLessonActive, setIsLessonActive] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState<boolean>(false); // New state to track lesson completion
  const [allCompleted, setAllCompleted] = useState<boolean>(initialLessonIndex >= lessons.length);
  const [showLessonIntro, setShowIntro] = useState<boolean>(true);
  const { t } = useTranslation();

  const totalQuestionsAnswered = lessons.reduce((sum, lesson) => sum + lesson.cards.length, 0);
  const currentLesson = lessons[currentLessonIndex];
  const totalIncorrectAnswers = state.countTotalIncorrectAnswers();

  // When the current lesson index changes, a new lesson begins
  useEffect(() => {
    setIncorrectAnswers(state.loadIncorrectAnswers(currentLessonIndex));
    setAllCompleted(currentLessonIndex >= lessons.length);
    setShowIntro(true);
    setLessonCompleted(false);
  }, [currentLessonIndex]);

  useEffect(() => {
    setIsLessonActive(!showLessonIntro && !lessonCompleted && !allCompleted);
  }, [currentLessonIndex, showLessonIntro, lessonCompleted, allCompleted]);

  const onIncorrectAnswer = (incorrectAnswer: string) => {
    setIncorrectAnswers((prev = []) => {
      const updatedAnswers = [...prev, incorrectAnswer];
      state.saveIncorrectAnswers(currentLessonIndex, updatedAnswers);
      return updatedAnswers;
    });
  };

  const onLessonSelected = (lessonIndex: number) => {
    setCurrentLessonIndex(lessonIndex);
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

  const onLessonComplete = () => {
    setLessonCompleted(true);
  }

  const renderTop = () => {
    return (
      <>
        <header>
          <div className="header-progress">
            <progress
              className="course-progress"
              value={currentLessonIndex}
              max={lessons.length}
              aria-label={t('course_progress')}
              title={`${t('all_lessons')} ${currentLessonIndex + 1} / ${lessons.length}`}
            />
          </div>

          <div className='header-text'>
            <h1 lang={config.targetLanguage}>{config.target.apptitle}</h1>
            {incorrectAnswers &&
              <span className="incorrectAnswers" title={t('incorrect_answer_count_alt')}>
                {t('incorrect_answer_count')} {incorrectAnswers.length > 0 ? ` - ${incorrectAnswers.length}` : ''}
              </span>
            }
            <h2 lang={config.defaultLanguage}>{config.default.apptitle}</h2>
          </div>
        </header>
      </>
    );
  }

  const renderConditional = () => {
    if (showLessonIntro) {
      return (
        <LessonIntro
          title={currentLesson.title}
          index={currentLessonIndex}
          onContinue={() => setShowIntro(false)}
        >
          <LessonList
            currentLessonIndex={currentLessonIndex}
            lessons={lessonTitles2Indicies()}
            onLessonSelected={onLessonSelected}
          />
        </LessonIntro>
      )
    }

    else if (lessonCompleted) {
      return (
        <LessonCompleted
          onContinue={goToNextLesson}
          questionCount={currentLesson.cards.length}
          mistakeCount={state.loadIncorrectAnswers(currentLessonIndex).length}
        />
      )
    }

    else if (allCompleted) {
      return (
        <CompletedAllLessons
          totalQuestions={totalQuestionsAnswered}
          totalLessons={lessons.length}
          totalIncorrectAnswers={totalIncorrectAnswers}
        >
          <LessonList
            currentLessonIndex={currentLessonIndex}
            lessons={lessonTitles2Indicies()}
            onLessonSelected={onLessonSelected}
          />
        </CompletedAllLessons>
      )
    };

    return (
      <LessonComponent
        key={currentLessonIndex}
        lesson={currentLesson}
        onComplete={onLessonComplete}
        onIncorrectAnswer={onIncorrectAnswer}
      />
    );
  };

  return (
    <main id='main' className={isLessonActive ? "lesson-active" : ""}>
      {renderTop()}
      {renderConditional()}
    </main>
  );
};

export default App;
