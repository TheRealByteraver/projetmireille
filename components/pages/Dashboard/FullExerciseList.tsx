import Button from '@/components/ui/generic/Button';
import LineGraphExercise from '@/components/ui/specific/LineGraphExercise';
import { Exercise } from '@/types/apiTypes';
import { TrashIcon } from '@heroicons/react/24/outline';

type Props = {
  exercises: Exercise[];
  handleRemoveExercise: (index: number) => void;
};

const FullExerciseList = (props: Props): React.JSX.Element | null => {
  // PROPS
  const { exercises, handleRemoveExercise } = props;

  return (
    <div className="w-full xl:flex xl:flex-col xl:overflow-auto">
      <p className="mt-4 mb-1 text-sm font-bold xl:mt-0">Liste actuelle</p>
      <div className="rounded-md border border-gray-300 p-4 xl:flex xl:h-full xl:flex-col xl:overflow-auto">
        {exercises.length > 0 && (
          <ul>
            {exercises.map((exercise, index) => (
              <li key={index} className="mb-4">
                {exercise.exerciseType === 'lineGraph' && (
                  <div className="group relative">
                    <LineGraphExercise
                      exercise={exercise.exerciseData}
                      color={exercise.exerciseData.level === 'CE1' ? 'blue' : 'green'}
                      isSolutionVisible={true}
                      interactive={false}
                    />
                    <div className="absolute top-0 hidden h-full w-full group-hover:block">
                      <Button
                        className="absolute top-1 right-1 p-1"
                        noPadding
                        color="red"
                        onClick={() => handleRemoveExercise(index)}
                      >
                        <TrashIcon className="size-5 text-white" />
                      </Button>
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
