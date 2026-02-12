'use client';
import Button from '@/components/Button';
import LineGraphExercise from '@/components/LineGraphExercise';
import { Exercise } from '@/types/frontend';
import { getExercise } from '@/utils/getExercise';
import { useState } from 'react';

type ExerciseConfig = {
  id: number;
  exercise: Exercise;
  color: 'blue' | 'green';
  isSolutionVisible: boolean;
};

const DEFAULT_EXERCISES: ExerciseConfig[] = [
  {
    id: 1,
    exercise: { startNumber: 100, step: 10, questionPosition: 1, nrOfSteps: 9 },
    color: 'blue',
    isSolutionVisible: false,
  },
  {
    id: 2,
    exercise: { startNumber: 500, step: 50, questionPosition: 1, nrOfSteps: 1 },
    color: 'green',
    isSolutionVisible: false,
  },
];

const Home = (): React.JSX.Element => {
  // STATE
  const [exercises, setExercises] = useState<ExerciseConfig[]>(DEFAULT_EXERCISES);

  // METHODS
  const showSolution = (id: number): void =>
    setExercises((prev) =>
      prev.map((exercise) => (exercise.id === id ? { ...exercise, isSolutionVisible: true } : exercise)),
    );

  const showAllSolutions = (): void =>
    setExercises((prev) => prev.map((exercise) => ({ ...exercise, isSolutionVisible: true })));

  const nextExercises = (): void => {
    setExercises([
      { id: 1, exercise: getExercise('CE1'), color: 'blue', isSolutionVisible: false },
      { id: 2, exercise: getExercise('CE2'), color: 'green', isSolutionVisible: false },
    ]);
  };

  return (
    <>
      <div className="flex justify-start flex-col gap-8 mt-12">
        {exercises.length &&
          exercises.map(({ id, exercise, isSolutionVisible, color }) => (
            <LineGraphExercise
              key={id}
              exercise={exercise}
              isSolutionVisible={isSolutionVisible}
              color={color}
              showSolution={() => showSolution(id)}
            />
          ))}
      </div>
      <div className="ml-10 mt-8 flex gap-4">
        <Button text="Nouveau" onClick={nextExercises} />
        <Button text="Solutions" color="green" onClick={showAllSolutions} />
      </div>
    </>
  );
};

export default Home;
