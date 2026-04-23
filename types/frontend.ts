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

type CurrentUser = {
  id: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  authorization?: string;
  roles: Role[];
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

type RadioOption = { label: string; value: string; enabled: boolean };

export type { LineGraphExercise, ButtonColors, User, CurrentUser, ExerciseList, RadioOption };
