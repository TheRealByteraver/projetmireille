import { ApiExerciseList } from '@/types/apiTypes';
import { useState } from 'react';
import Button from '../../../ui/generic/Button';
import LineGraphExercise from '../../../ui/specific/LineGraphExercise';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ToggleButton from '../../../ui/generic/ToggleButton';

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

  // VARS
  const isFirstExercise = exerciseList ? exerciseIndex === 0 : true;
  const isLastExercise = exerciseList
    ? twoExerciseMode
      ? exerciseIndex >= exerciseList.exercises.length - 2
      : exerciseIndex === exerciseList.exercises.length - 1
    : true;

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <ToggleButton
        label="Afficher 2 exercices à la fois"
        checked={twoExerciseMode}
        onChange={() => setTwoExerciseMode(!twoExerciseMode)}
      />
      <div className="flex h-full flex-col justify-between">
        {!exerciseList && <span>Aucune liste d&apos;exercices trouvée</span>}
        {exerciseList && (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">
              Exercice {exerciseIndex + 1}
              {twoExerciseMode &&
                exerciseIndex + 1 < exerciseList.exercises.length &&
                ' - ' + (exerciseIndex + 2)} / {exerciseList.exercises.length}
            </h1>

            <div className="flex flex-col gap-4 xl:flex-row">
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
        <Button className="ml-auto" onClick={closeModal}>
          Fermer
        </Button>
      </div>
    </div>
  );
};

export default PresentExerciseListModal;
