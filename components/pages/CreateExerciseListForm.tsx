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
    <div className="flex h-full flex-col gap-4 overflow-hidden border-2 border-red-500">
      <h1 className="text-2xl font-bold">Créer une liste d&apos;exercices</h1>
      <div className="flex h-full flex-col gap-4 overflow-auto xl:flex-row">
        <div className="flex h-full w-full flex-col gap-4 overflow-auto">
          <div>
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

        <div className="flex h-full w-full flex-col gap-1 overflow-hidden">
          <p className="text-sm font-bold">Liste d&apos;exercices</p>

          <ul className="flex h-full flex-col gap-4 overflow-auto rounded-md border border-gray-300 p-4">
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
