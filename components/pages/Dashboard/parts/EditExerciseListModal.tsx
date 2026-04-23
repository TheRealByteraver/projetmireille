import LineGraphExerciseInputs from '@/components/forms/LineGraphExerciseInputs';
import { ApiExerciseList, Exercise, ExerciseType } from '@/types/apiTypes';
import { LineGraphExercise as LineGraphExerciseType } from '@/types/frontend';
import { useEffect, useMemo, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import Button from '../../../ui/generic/Button';
import { useEditExerciseList } from '@/services/exerciseList';
import Input from '../../../ui/generic/Input';
import useAlert from '@/hooks/useAlert';
import { useForm } from 'react-hook-form';
import FullExerciseList from '../FullExerciseList';

type SelectOption = {
  value: ExerciseType;
  label: string;
};

type FormValues = {
  listName: string;
};

type Props = {
  exerciseList: ApiExerciseList;
  closeModal: () => void;
};

const EditExerciseListModal = (props: Props): React.JSX.Element => {
  // PROPS
  const { exerciseList, closeModal } = props;

  // RQ
  const { mutate: editExerciseList, status, error } = useEditExerciseList();

  // RHF
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    values: {
      listName: exerciseList.name,
    },
  });

  // HOOKS
  const [alert, setAlert, clearAlert] = useAlert();

  // VARS
  const options: SelectOption[] = useMemo(() => [{ value: 'lineGraph', label: 'Droite numérique' }], []);

  // STATE
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(options[0]);
  const [exercises, setExercises] = useState<Exercise[]>(exerciseList.exercises);

  // EFFECTS
  useEffect(() => {
    if (status === 'error') {
      setAlert({ alertType: status, message: error.message });
    } else if (status === 'success') {
      setAlert({
        alertType: status,
        message:
          'Liste sauvegardée avec succès. ' +
          'Cliquez sur "Fermer" pour revenir au tableau de bord, ou continuez à modifier la liste.',
      });
      //   setTimeout(() => {
      //     setExercises([]);
      //     reset();
      //     setSelectedOption(options[0]);
      //   }, 1);
    }
  }, [status, error, setAlert, reset, setSelectedOption, options]);

  // METHODS
  const handleEditExerciseList = (data: FormValues) => {
    clearAlert();

    const payload: ApiExerciseList = {
      id: exerciseList.id,
      name: data.listName,
      userID: exerciseList.userID,
      exercises: exercises,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    editExerciseList(payload);
  };

  const handleChange = (option: SingleValue<SelectOption>) => {
    setSelectedOption(option);
  };

  const handleAddExercise = (exercise: LineGraphExerciseType) => {
    if (!selectedOption) return;

    clearAlert();

    setExercises([
      ...exercises,
      {
        exerciseType: selectedOption.value,
        exerciseData: exercise,
      },
    ]);
  };

  const handleRemoveExercise = (index: number) => {
    const newExerciseList = [...exercises.filter((_, i) => i !== index)];
    setExercises(newExerciseList);
  };

  const handleMoveExercise = (index: number, relativeIndex: number) => {
    // swap exercise with the one above/ below it
    const newIndex = index + relativeIndex;
    setExercises((prev) => [...prev.map((_, i) => prev[i === index ? newIndex : i === newIndex ? index : i])]);
  };

  return (
    <form
      className="h-full w-full overflow-auto p-4 sm:flex sm:flex-col sm:justify-between sm:overflow-auto"
      onSubmit={handleSubmit(handleEditExerciseList)}
    >
      <div className="xl:flex xl:h-full xl:flex-col xl:overflow-hidden">
        <h1 className="mb-4 text-2xl font-bold">Edition de la liste &quot;{exerciseList.name}&quot;</h1>
        {alert && <div className="mb-4">{alert}</div>}
        <div className="xl:flex xl:h-full xl:w-full xl:flex-row xl:gap-4 xl:overflow-hidden">
          <div className="w-full xl:flex xl:flex-col xl:overflow-auto">
            <div className="mb-6">
              <Input
                className="mt-6"
                label="Nom de la liste"
                type="text"
                placeholder="Entrez le nom de la liste"
                error={errors.listName?.message}
                {...register('listName', { required: 'Le nom de la liste est requis' })}
              />
            </div>

            <div className="mb-6">
              <p className="mb-1 text-sm font-bold">Type d&apos;exercice</p>
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                isDisabled={options.length === 1}
              />
            </div>

            {selectedOption?.value && (
              <div className="rounded-md border border-gray-300 p-4">
                {selectedOption?.value === 'lineGraph' && <LineGraphExerciseInputs addExercise={handleAddExercise} />}
              </div>
            )}
          </div>

          <FullExerciseList
            exercises={exercises}
            handleRemoveExercise={handleRemoveExercise}
            handleMoveExercise={handleMoveExercise}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Button onClick={closeModal}>{status === 'success' ? 'Fermer' : 'Annuler'}</Button>
        <Button color="green" type="submit">
          Enregistrer les modifications
        </Button>
      </div>
    </form>
  );
};

export default EditExerciseListModal;
