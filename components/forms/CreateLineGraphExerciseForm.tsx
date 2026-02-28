import LineGraphExercise from '@/components/LineGraphExercise';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ClassLevel } from '@/types/apiTypes';
import { LineGraphExercise as LineGraphExerciseType } from '@/types/frontend';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';

type LevelOption = {
  value: ClassLevel;
  label: string;
};

type StepOption = {
  value: number;
  label: string;
};

type Props = {
  addExercise: (data: LineGraphExerciseType) => void;
};

const CreateLineGraphExerciseForm = (props: Props): React.JSX.Element => {
  // PROPS
  const { addExercise } = props;

  // RHF
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<LineGraphExerciseType>({
    defaultValues: {
      startNumber: 0,
      step: 1,
      questionPosition: 2,
      nrOfSteps: 3,
      level: 'CE1',
      difficulty: 'easy',
    },
  });
  const formValues = watch();

  // METHODS
  const onSubmit: SubmitHandler<LineGraphExerciseType> = (data) => {
    addExercise(data);
    reset(undefined, { keepValues: true });
    setFocus('step');
  };

  // EFFECTS
  useEffect(() => {
    if (formValues.questionPosition > formValues.nrOfSteps) setValue('questionPosition', formValues.nrOfSteps);
  }, [formValues.questionPosition, formValues.nrOfSteps, setValue]);

  // VARS
  const levelOptions: LevelOption[] = [
    { value: 'CE1', label: 'CE1' },
    { value: 'CE2', label: 'CE2' },
  ];

  const stepOptions: StepOption[] = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 100, label: '100' },
    { value: 1000, label: '1000' },
  ];
  return (
    <>
      <div className="mb-6">
        <LineGraphExercise
          exercise={{
            ...formValues,
            difficulty: 'easy',
          }}
          color={formValues.level === 'CE1' ? 'blue' : 'green'}
          isSolutionVisible={true}
          interactive={false}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="level" className="mb-1 text-sm font-bold">
          Niveau
        </label>
        <Controller
          control={control}
          name="level"
          render={({ field }) => (
            <Select
              id="level"
              className="mb-6"
              options={levelOptions}
              value={levelOptions.find((option) => option.value === field.value) ?? null}
              onChange={(option) => field.onChange(option?.value ?? null)}
            />
          )}
        />

        <label htmlFor="step" className="mb-1 text-sm font-bold">
          Taille du pas
        </label>
        <Controller
          control={control}
          name="step"
          render={({ field }) => (
            <Select
              id="step"
              className="mb-6"
              options={stepOptions}
              value={stepOptions.find((option) => option.value === field.value) ?? null}
              onChange={(option) => field.onChange(option?.value ?? null)}
            />
          )}
        />

        {/* <Input
          className="mb-6"
          type="number"
          min={1}
          label="Taille du pas"
          error={errors.step?.message}
          {...register('step', { valueAsNumber: true, required: true })}
        /> */}

        <Input
          className="mb-6"
          type="number"
          min={0}
          label="Nombre de départ"
          error={errors.startNumber?.message}
          {...register('startNumber', { valueAsNumber: true, required: true })}
        />

        <Input
          className="mb-8"
          type="number"
          min={1}
          label="Nombre de pas"
          error={errors.nrOfSteps?.message}
          {...register('nrOfSteps', { valueAsNumber: true, required: true })}
        />

        <Input
          className="mb-6"
          type="number"
          min={1}
          max={formValues.nrOfSteps}
          label="Position de la question"
          error={errors.questionPosition?.message}
          {...register('questionPosition', { valueAsNumber: true, required: true })}
        />

        <div className="flex w-full justify-end">
          <Button className="w-full sm:w-auto" color="green" type="submit">
            Ajouter l&apos;exercice
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateLineGraphExerciseForm;
