// App
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

import { allLessons as lessons } from './data/lessons';
import LessonComponent from './components/Lesson';
import config from './config';

import './App.css';

const App: React.FC = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const { t } = useTranslation();

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const currentLesson = lessons[currentLessonIndex];

  console.log('xxx', config);

  return (
    <main>
      <header>
        <h1 lang={config.targetLanguage}>{t("apptitle", { lng: config.targetLanguage })}</h1>
        <h2 lang={config.defaultLanguage}>{t("apptitle", { lng: config.defaultLanguage })}</h2>
      </header>

      {completed && (
        <p className="completed">Lessons complete!</p>
      )}

      {!completed && lessons.length > 0 && (
        <LessonComponent
          key={currentLessonIndex}
          title={currentLesson.title}
          cards={currentLesson.cards}
          onComplete={goToNextLesson}
        />
      )}

    </main>
  );
};

export default App;
