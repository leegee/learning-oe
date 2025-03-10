// App
import React, { useState } from 'react';
import { allLessons as lessons } from './data/lessons';
import LessonComponent from './components/Lesson';

import './App.css';

const App: React.FC = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const currentLesson = lessons[currentLessonIndex];

  return (
    <main>
      <h1>Old English Lessons</h1>

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
