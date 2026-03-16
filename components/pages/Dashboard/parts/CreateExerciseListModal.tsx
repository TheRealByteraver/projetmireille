import LineGraphExerciseInputs from '@/components/forms/LineGraphExerciseInputs';
import { ApiExerciseList, Exercise, ExerciseType } from '@/types/apiTypes';
import { LineGraphExercise as LineGraphExerciseType } from '@/types/frontend';
import { useEffect, useMemo, useState } from 'react';
// import Select, { SingleValue } from 'react-select';
import Button from '../../../ui/generic/Button';
import { useSaveExerciseList } from '@/services/exerciseList';
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
  closeModal: () => void;
};

const CreateExerciseListModal = (props: Props): React.JSX.Element => {
  // PROPS
  const { closeModal } = props;

  // RQ
  const { mutate: saveExerciseList, status, error } = useSaveExerciseList();

  // RHF
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // HOOKS
  const [alert, setAlert, clearAlert] = useAlert();

  // VARS
  const options: SelectOption[] = useMemo(() => [{ value: 'lineGraph', label: 'Graphique en ligne' }], []);

  // STATE
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(options[0]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // EFFECTS
  useEffect(() => {
    if (status === 'error') {
      setAlert({ alertType: status, message: error.message });
    } else if (status === 'success') {
      setAlert({
        alertType: status,
        message:
          'Liste sauvegardée avec succès. ' +
          'Cliquez sur "Fermer" pour revenir au tableau de bord, ou créez une nouvelle liste.',
      });
      setTimeout(() => {
        setExercises([]);
        reset();
        setSelectedOption(options[0]);
      }, 1);
    }
  }, [status, error, setAlert, reset, setSelectedOption, options]);

  // METHODS
  const handleSaveExerciseList = (data: FormValues) => {
    clearAlert();

    const payload: ApiExerciseList = {
      id: 0,
      name: data.listName,
      userID: 1, // TODO
      exercises: exercises,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveExerciseList(payload);
  };

  // const handleChange = (option: SingleValue<SelectOption>) => {
  //   setSelectedOption(option);
  // };

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

  return (
    <form
      className="h-full w-full overflow-auto p-4 sm:flex sm:flex-col sm:justify-between sm:overflow-auto"
      onSubmit={handleSubmit(handleSaveExerciseList)}
    >
      <div className="xl:flex xl:h-full xl:flex-col xl:overflow-hidden">
        <h1 className="mb-4 text-2xl font-bold">Créer une liste d&apos;exercices</h1>
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

            {/* <div className="mb-6">
              <p className="mb-1 text-sm font-bold">Type d&apos;exercice</p>
              <Select value={selectedOption} onChange={handleChange} options={options} />
            </div> */}

            {selectedOption?.value && (
              <div className="rounded-md border border-gray-300 p-4">
                {selectedOption?.value === 'lineGraph' && <LineGraphExerciseInputs addExercise={handleAddExercise} />}
              </div>
            )}
          </div>

          <FullExerciseList exercises={exercises} handleRemoveExercise={handleRemoveExercise} />
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Button onClick={closeModal}>{status === 'success' ? 'Fermer' : 'Annuler'}</Button>
        <Button color="green" type="submit">
          Sauvegarder la liste
        </Button>
      </div>
    </form>
  );
};

export default CreateExerciseListModal;
