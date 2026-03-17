import LineGraphExercise from '@/components/ui/specific/LineGraphExercise';
import Button from '@/components/ui/generic/Button';
import Input from '@/components/ui/generic/Input';
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

const LineGraphExerciseInputs = (props: Props): React.JSX.Element => {
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
    trigger,
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
  const onSubmit: SubmitHandler<LineGraphExerciseType> = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      addExercise(data);
      reset(undefined, { keepValues: true });
      setFocus('step');
    }
  };

  const sanitizeFormValues = (values: LineGraphExerciseType): LineGraphExerciseType => {
    const startNumber = isNaN(values.startNumber) ? 0 : values.startNumber;
    const nrOfSteps = isNaN(values.nrOfSteps) ? 12 : Math.min(12, Math.max(1, values.nrOfSteps));
    const questionPosition =
      isNaN(values.questionPosition) || values.questionPosition < 1 ? 1 : Math.min(nrOfSteps, values.questionPosition);

    return {
      ...values,
      startNumber,
      nrOfSteps,
      questionPosition,
    };
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
            ...sanitizeFormValues(formValues),
            difficulty: 'easy',
          }}
          color={formValues.level === 'CE1' ? 'blue' : 'green'}
          isSolutionVisible={true}
          interactive={false}
        />
      </div>

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

      <Input
        className="mb-6"
        type="number"
        min={0}
        label="Nombre de départ"
        error={errors.startNumber?.message}
        {...register('startNumber', {
          valueAsNumber: true,
          required: { value: true, message: 'Le nombre de départ est requis' },
          min: { value: 0, message: 'Le nombre de départ ne peut etre négatif' },
        })}
      />

      <Input
        className="mb-8"
        type="number"
        min={1}
        max={12}
        label="Nombre de pas"
        error={errors.nrOfSteps?.message}
        {...register('nrOfSteps', {
          valueAsNumber: true,
          required: { value: true, message: 'Le nombre de pas est requis' },
          min: { value: 1, message: 'Le nombre de pas ne peut etre inférieur à 1' },
          max: { value: 12, message: 'Le nombre de pas ne peut etre supérieur à 12' },
        })}
      />

      <Input
        className="mb-6"
        type="number"
        min={1}
        max={isNaN(formValues.nrOfSteps) ? 1 : Math.min(12, formValues.nrOfSteps)}
        label="Position de la question"
        error={errors.questionPosition?.message}
        {...register('questionPosition', {
          valueAsNumber: true,
          required: { value: true, message: 'La position de la question est requise' },
          min: { value: 1, message: 'La position de la question ne peut etre inférieure à 1' },
          max: {
            value: isNaN(formValues.nrOfSteps) ? 1 : formValues.nrOfSteps,
            message: 'La position de la question ne peut etre supérieure au nombre de pas',
          },
        })}
      />

      <div className="flex w-full justify-end">
        <Button className="w-full sm:w-auto" color="green" type="button" onClick={handleSubmit(onSubmit)}>
          Ajouter l&apos;exercice
        </Button>
      </div>
    </>
  );
};

export default LineGraphExerciseInputs;
