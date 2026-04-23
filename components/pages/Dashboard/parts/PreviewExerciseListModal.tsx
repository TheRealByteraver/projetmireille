import Button from '@/components/ui/generic/Button';
import LineGraphExercise from '@/components/ui/specific/LineGraphExercise';
import { ApiExerciseList } from '@/types/apiTypes';
import getExerciseLevelsString from '@/utils/getExerciseLevelsString';
import { useState } from 'react';

type Props = {
  exerciseList: ApiExerciseList;
  closeModal: () => void;
};

const PreviewExerciseListModal = (props: Props): React.JSX.Element => {
  // PROPS
  const { exerciseList, closeModal } = props;

  // STATE
  const [solutionsVisible, setSolutionsVisible] = useState<boolean[]>(Array(exerciseList.exercises.length).fill(false));

  // VARS
  const multipleExercisesString = exerciseList.exercises.length > 1 ? 's' : '';
  const exerciseLevelsString = getExerciseLevelsString(exerciseList.exercises);
  const multipleLevelsSuffix = exerciseLevelsString.includes(',') ? 'x' : '';

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <h1 className="text-2xl font-bold">{exerciseList.name}</h1>
      <p className="text-sm text-gray-500">
        {exerciseList.exercises.length} exercice{multipleExercisesString}, niveau
        {multipleLevelsSuffix} {exerciseLevelsString}
      </p>

      <ul className="flex flex-col gap-8">
        {exerciseList.exercises.map((exercise, index) => (
          <li key={index}>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <p className="text-lg font-bold">
                Exercice {index + 1} / {exerciseList.exercises.length}
              </p>
            </div>

            <LineGraphExercise
              exercise={exercise.exerciseData}
              color={exercise.exerciseData.level === 'CE1' ? 'blue' : 'green'}
              isSolutionVisible={solutionsVisible[index]}
              showSolution={() => setSolutionsVisible((prev) => prev.map((state, i) => (i === index ? true : state)))}
            />
          </li>
        ))}
      </ul>

      <Button className="mt-auto sm:mr-auto sm:w-auto" onClick={closeModal}>
        Fermer
      </Button>
    </div>
  );
};

export default PreviewExerciseListModal;
