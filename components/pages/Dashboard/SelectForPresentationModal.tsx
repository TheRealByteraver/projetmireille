import Button from '@/components/ui/generic/Button';
import { ApiExerciseList } from '@/types/apiTypes';
import getExerciseLevelsString from '@/utils/getExerciseLevelsString';
import { useState } from 'react';
import Select from 'react-select';

type Props = {
  exerciseLists: ApiExerciseList[];
  setExerciseListIds: (exerciseListIds: number[]) => void;
  closeModal: () => void;
};

const SelectForPresentationModal = (props: Props): React.JSX.Element => {
  // PROPS
  const { exerciseLists, setExerciseListIds, closeModal } = props;

  // STATE
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // VARS
  const selectOptions = exerciseLists.map((exerciseList) => {
    const levels = getExerciseLevelsString(exerciseList.exercises);
    return {
      value: exerciseList.id,
      label: `${exerciseList.name} (${levels}. ${exerciseList.exercises.length} exercices)`,
    };
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Selectionner la (les) série d&apos;exercices à présenter</h1>
      <Select
        className="mb-6"
        options={selectOptions}
        value={selectOptions.filter((option) => selectedIds.includes(option.value))}
        onChange={(option) => setSelectedIds(option.map((option) => option.value))}
        isOptionDisabled={() => selectedIds.length >= 2}
        isMulti
      />

      <div className="flex justify-between">
        <Button onClick={closeModal}>Annuler</Button>
        <Button color="green" disabled={selectedIds.length === 0} onClick={() => setExerciseListIds(selectedIds)}>
          Présenter
        </Button>
      </div>
    </div>
  );
};

export default SelectForPresentationModal;
