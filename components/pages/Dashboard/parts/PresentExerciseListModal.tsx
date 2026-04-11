import { ApiExerciseList } from '@/types/apiTypes';
import { useState } from 'react';
import Button from '../../../ui/generic/Button';
import LineGraphExercise from '../../../ui/specific/LineGraphExercise';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ToggleButton from '../../../ui/generic/ToggleButton';
import getExerciseLevelsString from '@/utils/getExerciseLevelsString';

type Props = {
  exerciseList?: ApiExerciseList;
  closeModal: () => void;
};

const PresentExerciseListModal = (props: Props): React.JSX.Element => {
  // PROPS
  const { exerciseList, closeModal } = props;

  // STATE
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [twoExerciseMode, setTwoExerciseMode] = useState<boolean>(false);
  const [solutionsVisible, setSolutionsVisible] = useState<boolean[]>([false, false]);

  // METHODS
  const handleNextExercise = (index: number) => {
    setExerciseIndex(Math.max(0, exerciseIndex + index));
    setSolutionsVisible([false, false]);
  };

  const handleToggleExerciseMode = (): void => {
    if (!exerciseList) return;
    if (!twoExerciseMode && exerciseIndex === exerciseList.exercises.length - 1 && exerciseIndex > 0)
      setExerciseIndex(exerciseIndex - 1);
    setTwoExerciseMode(!twoExerciseMode);
  };

  // VARS
  const isFirstExercise = exerciseList ? exerciseIndex === 0 : true;
  const isLastExercise = exerciseList
    ? twoExerciseMode
      ? exerciseIndex >= exerciseList.exercises.length - 2
      : exerciseIndex === exerciseList.exercises.length - 1
    : true;

  const multipleExercisesString = exerciseList && exerciseList.exercises.length > 1 ? 's' : '';
  const exerciseLevelsString = exerciseList ? getExerciseLevelsString(exerciseList.exercises) : '';
  const multipleLevelsSuffix = exerciseLevelsString.includes(',') ? 'x' : '';

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <ToggleButton
        label="Afficher les exercices par paire"
        checked={twoExerciseMode}
        onChange={handleToggleExerciseMode}
      />
      <div className="flex h-full flex-col justify-between">
        {!exerciseList && <span>Aucune liste d&apos;exercices trouvée</span>}
        {exerciseList && (
          <div className="flex flex-col gap-4">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <h1 className="text-2xl font-bold">{exerciseList.name}</h1>
              <p className="text-sm text-gray-500">
                {exerciseList.exercises.length} exercice{multipleExercisesString}, niveau
                {multipleLevelsSuffix} {exerciseLevelsString}
              </p>

              <p className="text-lg font-bold sm:ml-auto">
                Exercice {exerciseIndex + 1}
                {twoExerciseMode &&
                  exerciseIndex + 1 < exerciseList.exercises.length &&
                  ' - ' + (exerciseIndex + 2)} / {exerciseList.exercises.length}
              </p>
            </div>

            <div className="flex flex-col gap-16">
              <LineGraphExercise
                exercise={exerciseList.exercises[exerciseIndex].exerciseData}
                color={exerciseList.exercises[exerciseIndex].exerciseData.level === 'CE1' ? 'blue' : 'green'}
                isSolutionVisible={solutionsVisible[0]}
                showSolution={() => setSolutionsVisible((prev) => [true, prev[1]])}
              />
              {twoExerciseMode && exerciseIndex + 1 < exerciseList.exercises.length && (
                <LineGraphExercise
                  exercise={exerciseList.exercises[exerciseIndex + 1].exerciseData}
                  color={exerciseList.exercises[exerciseIndex + 1].exerciseData.level === 'CE1' ? 'blue' : 'green'}
                  isSolutionVisible={solutionsVisible[1]}
                  showSolution={() => setSolutionsVisible((prev) => [prev[0], true])}
                />
              )}
            </div>

            <div className="flex justify-between gap-2">
              <Button
                className="flex flex-row items-center gap-2"
                color="blue"
                disabled={isFirstExercise}
                onClick={() => handleNextExercise(-(twoExerciseMode ? 2 : 1))}
              >
                <ChevronLeftIcon className="size-5" />
                <span>Précédent</span>
              </Button>

              <Button
                className="flex flex-row items-center gap-2"
                color="blue"
                disabled={isLastExercise}
                onClick={() => handleNextExercise(twoExerciseMode ? 2 : 1)}
              >
                <span>Suivant</span>
                <ChevronRightIcon className="size-5" />
              </Button>
            </div>
          </div>
        )}

        <Button className="mt-4 w-full sm:mr-auto sm:w-auto" onClick={closeModal}>
          Fermer
        </Button>
      </div>
    </div>
  );
};

export default PresentExerciseListModal;
