import LineGraphExercise from '@/components/LineGraphExercise';
import CreateLineGraphExerciseForm from '@/components/pages/CreateLineGraphExerciseForm';
import { Exercise, ExerciseType } from '@/types/apiTypes';
import { LineGraphExercise as LineGraphExerciseType } from '@/types/frontend';
import { useState } from 'react';
import Select, { SingleValue } from 'react-select';

type SelectOption = {
  value: ExerciseType;
  label: string;
};

const CreateExerciseListForm = (): React.JSX.Element => {
  // VARS
  const options: SelectOption[] = [{ value: 'lineGraph', label: 'Graphique en ligne' }];

  // STATE
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(options[0]);
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

  // METHODS
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

  return (
    <div className="w-full h-full overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Créer une liste d&apos;exercices</h1>
      <div className="w-full h-full flex flex-row gap-4 overflow-hidden ">
        <div className="h-full w-full flex flex-col gap-4">
          <div>
            <p className="text-sm mb-1 font-bold">Type d&apos;exercice</p>
            <Select value={selectedOption} onChange={handleChange} options={options} />
          </div>

          {selectedOption?.value && (
            <div className="border border-gray-300 rounded-md p-4">
              {selectedOption?.value === 'lineGraph' && (
                <CreateLineGraphExerciseForm addExercise={(exercise) => handleAddExercise(exercise)} />
              )}
            </div>
          )}
        </div>

        <div className="hidden xl:block w-full border border-gray-300 rounded-md overflow-auto h-full">
          <ul className="  w-full h-full flex flex-col gap-8 overflow-auto">
            {exerciseList.map((exercise, index) => (
              <li key={index}>
                {exercise.exerciseType === 'lineGraph' && (
                  <LineGraphExercise
                    exercise={exercise.exerciseData}
                    color={exercise.exerciseData.level === 'CE1' ? 'blue' : 'green'}
                    isSolutionVisible={true}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateExerciseListForm;
