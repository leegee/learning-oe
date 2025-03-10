// App
import React, { useState } from 'react';
import { lessons } from './data/lessons';
import Lesson from './components/Lesson';

const App: React.FC = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const currentLesson = lessons[currentLessonIndex];

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Old English Lessons</h1>

      {lessons.length > 0 && (
        <Lesson
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
