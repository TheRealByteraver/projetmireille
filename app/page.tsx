'use client';
import LineGraphExercise from '@/components/LineGraphExercise';
import { Exercise } from '@/types/frontend';
import { getExercise } from '@/utils/getExercise';
import { useState } from 'react';

const DEFAULT_EXERCISES: Exercise[] = [
  { startNumber: 100, step: 10, questionPosition: 1, nrOfSteps: 1 },
  { startNumber: 500, step: 50, questionPosition: 1, nrOfSteps: 1 },
];

const Home = (): React.JSX.Element => {
  // STATE
  const [exercises, setExercises] = useState<Exercise[]>(DEFAULT_EXERCISES);
  // console.log('exercises:', exercises);

  return (
    <>
      <div className="flex justify-start flex-row">
        {exercises.length >= 2 && (
          <>
            <LineGraphExercise exercise={exercises[0]} color="blue" />
            <LineGraphExercise exercise={exercises[1]} color="green" />
          </>
        )}
      </div>
      <button
        className={
          'py-1 px-2 ml-10 mt-4 border-2 bg-green-600 text-white border-green-600 rounded-md hover:cursor-pointer'
        }
        onClick={() => setExercises([getExercise('CE1'), getExercise('CE2')])}
      >
        Next
      </button>
    </>
  );
};

export default Home;
