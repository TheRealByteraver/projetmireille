import LineGraphExercise from '@/components/LineGraphExercise';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ClassLevel } from '@/types/apiTypes';
import { LineGraphExercise as LineGraphExerciseType } from '@/types/frontend';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';

type LevelOption = {
  value: ClassLevel;
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
  const onSubmit: SubmitHandler<LineGraphExerciseType> = (data) => {
    addExercise(data);
  };

  // VARS
  const [startNumber, step, questionPosition, nrOfSteps, level] = watch([
    'startNumber',
    'step',
    'questionPosition',
    'nrOfSteps',
    'level',
  ]);

  const levelOptions: LevelOption[] = [
    { value: 'CE1', label: 'CE1' },
    { value: 'CE2', label: 'CE2' },
  ];

  return (
    <>
      <div className="mb-6">
        <LineGraphExercise
          exercise={{
            startNumber: Number(startNumber),
            step: Number(step),
            questionPosition: Number(questionPosition),
            nrOfSteps: Number(nrOfSteps),
            level,
            difficulty: 'easy',
          }}
          color={level === 'CE1' ? 'blue' : 'green'}
          isSolutionVisible={true}
          showSolution={() => {}}
        />
      </div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="mb-6"
          type="number"
          label="Nombre de départ"
          error={errors.startNumber?.message}
          {...register('startNumber')} //, { required: 'Invullen ajb!' })}
        />

        <Input
          className="mb-6"
          type="number"
          label="Taille du pas"
          error={errors.step?.message}
          {...register('step', { required: true })}
        />

        <Input
          className="mb-6"
          type="number"
          label="Position de la question"
          error={errors.questionPosition?.message}
          {...register('questionPosition', { required: true })}
        />

        <Input
          className="mb-6"
          type="number"
          label="Nombre de pas"
          error={errors.nrOfSteps?.message}
          {...register('nrOfSteps', { required: true })}
        />

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

        <div className="mb-2 flex w-full justify-end">
          <Button className="w-full sm:w-auto" color="green" type="submit">
            Ajouter l&apos;exercice
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateLineGraphExerciseForm;
