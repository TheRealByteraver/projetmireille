import LineGraphExercise from '@/components/LineGraphExercise';
import CreateLineGraphExerciseForm from '@/components/forms/CreateLineGraphExerciseForm';
import { Exercise, ExerciseType } from '@/types/apiTypes';
import { LineGraphExercise as LineGraphExerciseType } from '@/types/frontend';
import { useState } from 'react';
import Select, { SingleValue } from 'react-select';

type SelectOption = {
  value: ExerciseType;
  label: string;
};

const CreateExerciseListModal = (): React.JSX.Element => {
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
    <div className="xl:flex xl:h-full xl:flex-col xl:overflow-hidden">
      <h1 className="mb-4 text-2xl font-bold">Créer une liste d&apos;exercices</h1>

      <div className="xl:flex xl:h-full xl:w-full xl:flex-row xl:gap-4 xl:overflow-hidden">
        <div className="w-full xl:flex xl:flex-col xl:overflow-auto">
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
  );
};

export default CreateExerciseListModal;
