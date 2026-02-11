import { ClassLevel, Exercise } from '@/types/frontend';

type ExerciseConfig = {
  startValueRange: number[];
  stepOptions: number[];
  nrOfStepsRange: number[];
};

const classLevelConfig: Record<ClassLevel, ExerciseConfig> = {
  CE1: {
    startValueRange: [0, 900],
    stepOptions: [1, 2, 5, 10, 100],
    nrOfStepsRange: [2, 10],
  },
  CE2: {
    startValueRange: [0, 10000],
    stepOptions: [1, 2, 5, 10, 100, 1000],
    nrOfStepsRange: [2, 10],
  },
};

const getStep = (classLevel: ClassLevel): number => {
  const nrOfOptions = classLevelConfig[classLevel].stepOptions.length;
  const randomIndex = Math.floor(Math.random() * nrOfOptions);
  return classLevelConfig[classLevel].stepOptions[randomIndex];
};

const getNrOfSteps = (classLevel: ClassLevel): number => {
  const [start, end] = classLevelConfig[classLevel].nrOfStepsRange;
  const delta = end - start;
  return Math.floor(Math.random() * delta) + start; // 3..9
};

const getStartNumber = (classLevel: ClassLevel, step: number): number => {
  const rndMult = Math.floor(
    (classLevelConfig[classLevel].startValueRange[1] - classLevelConfig[classLevel].startValueRange[0]) / step,
  );
  return classLevelConfig[classLevel].startValueRange[0] + Math.floor(Math.random() * rndMult + 1) * step;
};

const getExercise = (classLevel: ClassLevel): Exercise => {
  const step = getStep(classLevel);
  const nrOfSteps = getNrOfSteps(classLevel);
  const startNumber = getStartNumber(classLevel, step);
  const questionPosition = 1 + Math.floor(Math.random() * nrOfSteps);

  return {
    startNumber,
    step,
    questionPosition,
    nrOfSteps: nrOfSteps,
  };
};

export { getExercise };
