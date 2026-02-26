import LineGraphExercise from '@/components/LineGraphExercise';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { LineGraphExercise as LineGraphExerciseType } from '@/types/frontend';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  const [startNumber, step, questionPosition, nrOfSteps] = watch([
    'startNumber',
    'step',
    'questionPosition',
    'nrOfSteps',
  ]);

  return (
    <>
      <div className="mb-6">
        <LineGraphExercise
          exercise={{
            startNumber: Number(startNumber),
            step: Number(step),
            questionPosition: Number(questionPosition),
            nrOfSteps: Number(nrOfSteps),
            level: 'CE1',
            difficulty: 'easy',
          }}
          color="blue"
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
