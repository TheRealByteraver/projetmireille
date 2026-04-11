import { ApiExerciseList } from '@/types/apiTypes';
import { useState } from 'react';
import Button from '../../../ui/generic/Button';
import LineGraphExercise from '../../../ui/specific/LineGraphExercise';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import getExerciseLevelsString from '@/utils/getExerciseLevelsString';

type Props = {
  exerciseLists: ApiExerciseList[];
  closeModal: () => void;
};

const PresentExerciseListsModal = (props: Props): React.JSX.Element => {
  // PROPS
  const { exerciseLists, closeModal } = props;

  // STATE
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [solutionsVisible, setSolutionsVisible] = useState<boolean[]>(Array(exerciseLists.length).fill(false));

  // METHODS
  const handleNextExercise = (relativeIndex: number) => {
    const newIndex = exerciseIndex + relativeIndex;
    setExerciseIndex(newIndex);

    setSolutionsVisible((prev) =>
      prev.map((state, listIndex) => (newIndex > exerciseLists[listIndex].exercises.length - 1 ? state : false)),
    );
  };

  // VARS
  const longestListLength = exerciseLists.reduce((prev, cur) => Math.max(prev, cur.exercises.length), 0);

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <ul className="flex flex-col gap-8">
        {exerciseLists.map((exerciseList, index) => {
          const multipleExercisesString = exerciseList.exercises.length > 1 ? 's' : '';
          const exerciseLevelsString = getExerciseLevelsString(exerciseList.exercises);
          const multipleLevelsSuffix = exerciseLevelsString.includes(',') ? 'x' : '';
          const cappedIndex = Math.min(exerciseIndex, exerciseList.exercises.length - 1);
          return (
            <li key={exerciseList.id}>
              <div className="mb-4 flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <h1 className="text-2xl font-bold">{exerciseList.name}</h1>
                <p className="text-sm text-gray-500">
                  {exerciseList.exercises.length} exercice{multipleExercisesString}, niveau
                  {multipleLevelsSuffix} {exerciseLevelsString}
                </p>

                <p className="text-lg font-bold sm:ml-auto">
                  Exercice {cappedIndex + 1} / {exerciseList.exercises.length}
                </p>
              </div>

              <LineGraphExercise
                exercise={exerciseList.exercises[cappedIndex].exerciseData}
                color={exerciseList.exercises[cappedIndex].exerciseData.level === 'CE1' ? 'blue' : 'green'}
                isSolutionVisible={solutionsVisible[index]}
                showSolution={() => setSolutionsVisible((prev) => prev.map((state, i) => (i === index ? true : state)))}
              />
            </li>
          );
        })}
      </ul>

      <div className="flex justify-between gap-2">
        <Button
          className="flex flex-row items-center gap-2"
          color="blue"
          disabled={exerciseIndex === 0}
          onClick={() => handleNextExercise(-1)}
        >
          <ChevronLeftIcon className="size-5" />
          <span>Précédent</span>
        </Button>

        <Button
          className="flex flex-row items-center gap-2"
          color="blue"
          disabled={exerciseIndex === longestListLength - 1}
          onClick={() => handleNextExercise(1)}
        >
          <span>Suivant</span>
          <ChevronRightIcon className="size-5" />
        </Button>
      </div>

      <Button className="mt-auto sm:mr-auto sm:w-auto" onClick={closeModal}>
        Fermer
      </Button>
    </div>
  );
};

export default PresentExerciseListsModal;
