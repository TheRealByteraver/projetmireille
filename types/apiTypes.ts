import { LineGraphExercise } from '@/types/frontend';

type Role = 'admin' | 'teacher' | 'student';
type ClassLevel = 'CE1' | 'CE2';
type Difficulty = 'easy' | 'medium' | 'hard';
type ExerciseType = 'lineGraph'; // TODO: add other exercise type definitions

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
  // createdAt: Date;
  // updatedAt: Date;
};

type Exercise = {
  exerciseType: ExerciseType;
  exerciseData: LineGraphExercise; // TODO: add other exercise type definitions as needed
};

type ExerciseList = {
  id: number;
  name: string;
  userID: number; // creator / owner
  exercises: Exercise[];
  // createdAt: Date;
  // updatedAt: Date;
};

export type { User, Exercise, ExerciseList, ClassLevel, Difficulty };
