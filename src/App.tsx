// App
import React, { useState } from 'react';
import { lessons } from './data/lessons';
import LessonComponent from './components/Lesson';

import './App.css';

const App: React.FC = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const currentLesson = lessons[currentLessonIndex];

  return (
    <main>
      <h1>Old English Lessons</h1>

      {lessons.length > 0 && (
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
