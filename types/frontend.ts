import { ClassLevel, Difficulty } from '@/types/apiTypes';

type LineGraphExercise = {
  startNumber: number;
  step: number;
  questionPosition: number;
  nrOfSteps: number;
  level: ClassLevel;
  difficulty: Difficulty;
};

export type { LineGraphExercise };
