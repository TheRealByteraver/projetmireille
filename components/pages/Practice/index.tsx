'use client';
import Button from '@/components/ui/generic/Button';
import LineGraphExercise from '@/components/ui/specific/LineGraphExercise';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LineGraphExercise as LineGraphExerciseType, RadioOption } from '@/types/frontend';
import Input from '@/components/ui/generic/Input';
import { getExercise } from '@/utils/getExercise';
import { useForm } from 'react-hook-form';
import SmallCardsRadioGroup from '@/components/ui/generic/SmallCardsRadioGroup';
import { ClassLevel } from '@/types/apiTypes';

type pageStates = 'solving' | 'correct' | 'incorrect';

type FormValues = { answer: string };

type LevelConfig = {
  start: number;
  end: number;
  stageSteps: number[];
};

const LEVEL_CONFIGS: Record<ClassLevel, Record<number, LevelConfig>> = {
  CE1: {
    1: { start: 0, end: 100, stageSteps: [1, 2, 10, 5] },
    2: { start: 0, end: 500, stageSteps: [1, 2, 10, 5] },
    3: { start: 0, end: 999, stageSteps: [1, 2, 10, 5, 100] },
  },
  CE2: {
    1: { start: 0, end: 999, stageSteps: [1, 2, 10, 5, 100] },
    2: { start: 0, end: 2000, stageSteps: [1, 2, 10, 5, 100] },
    3: { start: 0, end: 9999, stageSteps: [1, 2, 10, 5, 100, 1000, 50, 25, 500, 250] },
  },
};

const NEXT_STAGE_THRESHOLD = 5;

const DEFAULT_EXERCISE: LineGraphExerciseType = {
  startNumber: 1,
  step: 1,
  questionPosition: 2,
  nrOfSteps: 3,
  level: 'CE1',
  difficulty: 'easy',
};

const Practice = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // RHF
  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>({
    defaultValues: { answer: '' },
  });

  // STATE
  const [classLevel, setClassLevel] = useState<ClassLevel>('CE1');
  const [level, setLevel] = useState<number>(1);
  const [stage, setStage] = useState<number>(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [exercise, setExercise] = useState<LineGraphExerciseType>(DEFAULT_EXERCISE);
  const [pageState, setPageState] = useState<pageStates>('solving');

  // EFFECTS
  useEffect(() => {
    if (pageState === 'solving') setFocus('answer');
    else nextExerciseButtonRef.current?.focus();
  }, [pageState, setFocus]);

  // METHODS
  const onSubmit = (formValues: FormValues): void => {
    const answerNumber = Number(formValues.answer);
    if (isNaN(answerNumber)) return;

    const solution = exercise.startNumber + exercise.questionPosition * exercise.step;
    if (answerNumber === solution) {
      setPageState('correct');
      if (correctAnswerCount + 1 >= NEXT_STAGE_THRESHOLD) {
        if (stage < LEVEL_CONFIGS[classLevel][level].stageSteps.length - 1) {
          setStage(stage + 1);
        } else {
          if (level < 3) {
            setLevel(level + 1);
            setStage(0);
          }
        }
        setCorrectAnswerCount(0);
      } else setCorrectAnswerCount(correctAnswerCount + 1);
    } else {
      setPageState('incorrect');
      setCorrectAnswerCount(0);
    }
  };

  const handleSetClassLevel = (classLevel: ClassLevel): void => {
    setClassLevel(classLevel);
    setLevel(1);
    setStage(0);
    setCorrectAnswerCount(0);
    nextExercise();
  };

  const handleSetLevel = (level: number): void => {
    setLevel(level);
    setStage(0);
    setCorrectAnswerCount(0);
    nextExercise();
  };

  const nextExercise = (): void => {
    const levelConfig = LEVEL_CONFIGS[classLevel][level];
    setExercise(getExercise(levelConfig.start, levelConfig.end, levelConfig.stageSteps[stage]));
    setPageState('solving');
    reset();
  };

  const getNextExerciseString = (): string => {
    const newStage = correctAnswerCount === 0 && pageState === 'correct';
    const newLevel = newStage && level > 1 && stage === 0;

    if (newLevel) return 'Passons au niveau supérieur!';
    if (newStage) return "Passons a l'etape suivante!";
    return 'Faisons un autre exercice.';
  };

  // VARS
  const nextExerciseButtonRef = useRef<HTMLButtonElement | null>(null);

  const classLevelOptions: RadioOption[] = [
    { label: 'CE1', value: 'CE1', enabled: true },
    { label: 'CE2', value: 'CE2', enabled: true },
  ];

  const levelOptions: RadioOption[] = [
    { label: '1', value: '1', enabled: true },
    { label: '2', value: '2', enabled: true },
    { label: '3', value: '3', enabled: true },
  ];

  return (
    <div className="flex h-full flex-col justify-start gap-4 overflow-y-auto p-4 text-gray-700">
      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <div className="relative w-full rounded-md border border-gray-300 p-4 md:w-1/2">
          <p className="text-md absolute -top-3 left-2 bg-white px-1 font-medium">Classe</p>
          <SmallCardsRadioGroup
            name="classLevelOptions"
            options={classLevelOptions}
            value={classLevel}
            setValue={(value: string) => handleSetClassLevel(value as ClassLevel)}
          />
        </div>
        <div className="relative w-full rounded-md border border-gray-300 p-4 md:w-1/2">
          <p className="text-md absolute -top-3 left-2 bg-white px-1 font-medium">Niveau</p>
          <SmallCardsRadioGroup
            name="levelOptions"
            options={levelOptions}
            value={level.toString()}
            setValue={(value: string) => handleSetLevel(Number(value))}
          />
        </div>
      </div>

      <div className="text-lg font-semibold">
        <p>
          {pageState === 'correct' && 'Bonne réponse !'}
          {pageState === 'incorrect' && 'Ah, presque! Faisons un autre exercice.'}
        </p>
        {pageState === 'solving' && (
          <div className="flex flex-row justify-between gap-2">
            <p>{`Exercice ${correctAnswerCount + 1} / ${NEXT_STAGE_THRESHOLD}`}</p>
            <p>{`Étape ${stage + 1}`}</p>
          </div>
        )}
      </div>

      <div>
        <LineGraphExercise
          exercise={exercise}
          isSolutionVisible={pageState !== 'solving'}
          color={classLevel === 'CE1' ? 'blue' : 'green'}
          interactive={false}
        />
      </div>

      {pageState === 'solving' && (
        <>
          <p>Tape le nombre qui correspond à la case et clique sur vérifier.</p>
          <form className="flex flex-row gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('answer', {
                valueAsNumber: true,
                required: { value: true, message: 'Donne le nombre qui correspond à la case' },
                min: { value: 1, message: 'La réponse ne peut etre inférieur à 1' },
              })}
              type="number"
              min={1}
              step={1}
              placeholder="Tape le nombre"
            />
            <Button color="green" type="submit">
              Vérifier
            </Button>
          </form>
        </>
      )}
      {pageState !== 'solving' && (
        <>
          <p>{getNextExerciseString()}</p>
          <Button
            ref={nextExerciseButtonRef}
            className="w-full sm:mr-auto sm:w-auto"
            color="green"
            onClick={nextExercise}
          >
            Exercice suivant
          </Button>
        </>
      )}

      <Button className="mt-auto w-full sm:mr-auto sm:w-auto" onClick={() => router.push('/')} color="white">
        Page d&apos;accueil
      </Button>
    </div>
  );
};

export default Practice;
