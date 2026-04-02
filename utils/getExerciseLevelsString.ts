import { Exercise } from '@/types/apiTypes';

const getExerciseLevels = (exercises: Exercise[]): string[] =>
  exercises.reduce(
    (prev, next) => (prev.includes(next.exerciseData.level) ? prev : [...prev, next.exerciseData.level]),
    [] as string[],
  );

const getExerciseLevelsString = (exercises: Exercise[]): string => getExerciseLevels(exercises).join(', ');

export default getExerciseLevelsString;
