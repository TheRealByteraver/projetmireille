import { ClassLevel, Difficulty, Exercise, Role } from '@/types/apiTypes';

type ButtonColors = 'white' | 'green' | 'blue' | 'indigo' | 'red' | 'yellow';

type User = {
  id: number;
  lastName: string;
  firstName: string;
  username: string;
  password: string;
  roles: Role[];
  level?: ClassLevel;
  // TODO: add practice level
  // email: string;
  createdAt: Date;
  updatedAt: Date;
};

type ExerciseList = {
  id: number;
  name: string;
  userID: number; // creator / owner
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
};

type LineGraphExercise = {
  startNumber: number;
  step: number;
  questionPosition: number;
  nrOfSteps: number;
  level: ClassLevel;
  difficulty: Difficulty;
};

export type { LineGraphExercise, ButtonColors, User, ExerciseList };
