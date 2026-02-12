'use client';
import Button from '@/components/ui/Button';
import LineGraphExercise, { LineGraphExerciseColor } from '@/components/LineGraphExercise';
import { Exercise } from '@/types/frontend';
import { getExercise } from '@/utils/getExercise';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ExerciseConfig = {
  id: number;
  exercise: Exercise;
  color: LineGraphExerciseColor;
  isSolutionVisible: boolean;
};

const DEFAULT_EXERCISES: ExerciseConfig[] = [
  {
    id: 1,
    exercise: { startNumber: 10000, step: 10, questionPosition: 1, nrOfSteps: 9 },
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

const Practice = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

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
    <div className="h-screen w-screen flex flex-col justify-between pb-6">
      <div className="w-full mt-8 px-4">
        {exercises.length &&
          exercises.map(({ id, exercise, isSolutionVisible, color }) => (
            <div key={id} className="mb-8">
              <LineGraphExercise
                exercise={exercise}
                isSolutionVisible={isSolutionVisible}
                color={color}
                showSolution={() => showSolution(id)}
              />
            </div>
          ))}
        <div className="ml-4 flex gap-4">
          <Button onClick={nextExercises}>Nouveau</Button>
          <Button color="green" onClick={showAllSolutions}>
            Solutions
          </Button>
        </div>
      </div>
      <div className="ml-4">
        <Button onClick={() => router.push('/')} color="green">
          Page principale
        </Button>
      </div>
    </div>
  );
};

export default Practice;
