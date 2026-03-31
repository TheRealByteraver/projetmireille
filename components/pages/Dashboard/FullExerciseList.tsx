import Button from '@/components/ui/generic/Button';
import LineGraphExercise from '@/components/ui/specific/LineGraphExercise';
import { Exercise } from '@/types/apiTypes';
import { TrashIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

type Props = {
  exercises: Exercise[];
  handleRemoveExercise: (index: number) => void;
  handleMoveExercise: (index: number, relativeIndex: number) => void;
};

const FullExerciseList = (props: Props): React.JSX.Element | null => {
  // PROPS
  const { exercises, handleRemoveExercise, handleMoveExercise } = props;

  return (
    <div className="w-full xl:flex xl:flex-col xl:overflow-auto">
      <p className="mt-4 mb-1 text-sm font-bold xl:mt-0">Liste actuelle</p>
      <div className="rounded-md border border-gray-300 p-4 xl:flex xl:h-full xl:flex-col xl:overflow-auto">
        {exercises.length > 0 && (
          <ul>
            {exercises.map((exercise, index) => (
              <li key={index}>
                {exercise.exerciseType === 'lineGraph' && (
                  <div className="group relative py-4">
                    <LineGraphExercise
                      exercise={exercise.exerciseData}
                      color={exercise.exerciseData.level === 'CE1' ? 'blue' : 'green'}
                      isSolutionVisible={true}
                      interactive={false}
                    />
                    <div className="absolute top-0 left-0 hidden h-full w-full rounded-md bg-black/5 group-hover:block">
                      <Button
                        className="absolute top-2 right-2 p-1"
                        withPadding={false}
                        color="red"
                        onClick={() => handleRemoveExercise(index)}
                      >
                        <TrashIcon className="size-5 text-white" />
                      </Button>

                      <div className="absolute top-2 left-2 flex flex-row gap-2">
                        <Button
                          className="p-1"
                          withPadding={false}
                          color="blue"
                          disabled={index === 0}
                          onClick={() => handleMoveExercise(index, -1)}
                        >
                          <ChevronUpIcon className="size-5 text-white" />
                        </Button>

                        <Button
                          className="p-1"
                          withPadding={false}
                          color="blue"
                          disabled={index === exercises.length - 1}
                          onClick={() => handleMoveExercise(index, 1)}
                        >
                          <ChevronDownIcon className="size-5 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FullExerciseList;
