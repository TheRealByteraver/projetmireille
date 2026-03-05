import { ApiExerciseList } from '@/types/apiTypes';
import { useState } from 'react';
import Button from '../ui/Button';
import LineGraphExercise from '../LineGraphExercise';

type Props = {
  exerciseList?: ApiExerciseList;
  closeModal: () => void;
};

const PresentExerciseListModal = (props: Props): React.JSX.Element => {
  // PROPS
  const { exerciseList, closeModal } = props;

  // STATE
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [isSolutionVisible, setIsSolutionVisible] = useState<boolean>(false);

  // METHODS
  const handleNextExercise = (index: number) => {
    setExerciseIndex(exerciseIndex + index);
    setIsSolutionVisible(false);
  };

  // VARS
  const isFirstExercise = exerciseList ? exerciseIndex === 0 : true;
  const isLastExercise = exerciseList ? exerciseIndex === exerciseList.exercises.length - 1 : true;

  return (
    <div className="flex h-full flex-col justify-between p-4">
      {!exerciseList && <span>Aucune liste d&apos;exercices trouvée</span>}
      {exerciseList && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">
            Exercice {exerciseIndex + 1} / {exerciseList.exercises.length}
          </h1>
          <LineGraphExercise
            exercise={exerciseList.exercises[exerciseIndex].exerciseData}
            color={exerciseList.exercises[exerciseIndex].exerciseData.level === 'CE1' ? 'blue' : 'green'}
            isSolutionVisible={isSolutionVisible}
            showSolution={() => setIsSolutionVisible(true)}
          />
          <div className="flex justify-between gap-2">
            <Button className="" color="blue" disabled={isFirstExercise} onClick={() => handleNextExercise(-1)}>
              {'<< Précédent'}
            </Button>

            <Button className="" color="blue" disabled={isLastExercise} onClick={() => handleNextExercise(1)}>
              {'Suivant >>'}
            </Button>
          </div>
        </div>
      )}
      <Button className="ml-auto" onClick={closeModal}>
        Fermer
      </Button>
    </div>
  );
};

export default PresentExerciseListModal;
