import LineGraphExercise from '@/components/LineGraphExercise';
import CreateLineGraphExerciseForm from '@/components/forms/CreateLineGraphExerciseForm';
import { ApiExerciseList, Exercise, ExerciseType } from '@/types/apiTypes';
import { LineGraphExercise as LineGraphExerciseType } from '@/types/frontend';
import { useEffect, useMemo, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import Button from '../ui/Button';
import { useSaveExerciseList } from '@/services/exerciseList';
import Input from '../ui/Input';
import useAlert from '@/hooks/useAlert';

type SelectOption = {
  value: ExerciseType;
  label: string;
};

type Props = {
  closeModal: () => void;
};

const CreateExerciseListModal = (props: Props): React.JSX.Element => {
  // PROPS
  const { closeModal } = props;

  // RQ
  const { mutate: saveExerciseList, status, error } = useSaveExerciseList();

  // HOOKS
  const [alert, setAlert, clearAlert] = useAlert();

  // VARS
  const options: SelectOption[] = useMemo(() => [{ value: 'lineGraph', label: 'Graphique en ligne' }], []);

  // STATE
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(options[0]);
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [listName, setListName] = useState('');

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
        setExerciseList([]);
        setListName('');
        setSelectedOption(options[0]);
      }, 1);
    }
  }, [status, error, setAlert, setExerciseList, setListName, setSelectedOption, options]);

  // METHODS
  const handleSaveExerciseList = () => {
    clearAlert();

    const payload: ApiExerciseList = {
      id: 0,
      name: listName,
      userID: 1, // TODO
      exercises: exerciseList,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveExerciseList(payload);
  };

  const handleChange = (option: SingleValue<SelectOption>) => {
    setSelectedOption(option);
  };

  const handleAddExercise = (exercise: LineGraphExerciseType) => {
    if (!selectedOption) return;

    setExerciseList([
      ...exerciseList,
      {
        exerciseType: selectedOption.value,
        exerciseData: exercise,
      },
    ]);
  };

  // VARS
  const validList = exerciseList.length > 0 && listName !== '';

  return (
    <div className="h-full w-full overflow-auto p-4 sm:flex sm:flex-col sm:justify-between sm:overflow-auto">
      <div className="xl:flex xl:h-full xl:flex-col xl:overflow-hidden">
        <h1 className="mb-4 text-2xl font-bold">Créer une liste d&apos;exercices</h1>
        {alert && <div className="mb-4">{alert}</div>}
        <div className="xl:flex xl:h-full xl:w-full xl:flex-row xl:gap-4 xl:overflow-hidden">
          <div className="w-full xl:flex xl:flex-col xl:overflow-auto">
            <div className="mb-6">
              <p className="mb-1 text-sm font-bold">Nom de la liste</p>
              <Input
                type="text"
                placeholder="Nom de la liste"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <p className="mb-1 text-sm font-bold">Type d&apos;exercice</p>
              <Select value={selectedOption} onChange={handleChange} options={options} />
            </div>

            {selectedOption?.value && (
              <div className="rounded-md border border-gray-300 p-4">
                {selectedOption?.value === 'lineGraph' && (
                  <CreateLineGraphExerciseForm addExercise={(exercise) => handleAddExercise(exercise)} />
                )}
              </div>
            )}
          </div>

          <div className="w-full xl:flex xl:flex-col xl:overflow-auto">
            {exerciseList.length > 0 && (
              <>
                <p className="mt-4 mb-1 text-sm font-bold xl:mt-0">Liste actuelle</p>

                <ul className="rounded-md border border-gray-300 p-4 xl:flex xl:h-full xl:flex-col xl:overflow-auto">
                  {exerciseList.map((exercise, index) => (
                    <li key={index} className="mb-4">
                      {exercise.exerciseType === 'lineGraph' && (
                        <LineGraphExercise
                          exercise={exercise.exerciseData}
                          color={exercise.exerciseData.level === 'CE1' ? 'blue' : 'green'}
                          isSolutionVisible={true}
                          interactive={false}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Button onClick={closeModal}>{status === 'success' ? 'Fermer' : 'Annuler'}</Button>
        <Button color="green" onClick={handleSaveExerciseList} disabled={!validList}>
          Sauvegarder la liste
        </Button>
      </div>
    </div>
  );
};

export default CreateExerciseListModal;
