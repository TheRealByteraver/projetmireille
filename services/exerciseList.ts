import useCurrentUser from '@/hooks/useCurrentUser';
import { ApiExerciseList } from '@/types/apiTypes';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

const EXERCISELISTS = 'exercise-lists';

// ****************************************************************************
// GET EXERCISE LISTS
const fetchExerciseLists = async (): Promise<ApiExerciseList[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercise-lists`);
  const data = await response.json();
  return data;
};

const useExerciseLists = (): UseQueryResult<ApiExerciseList[], Error> =>
  useQuery({
    queryKey: [EXERCISELISTS],
    queryFn: fetchExerciseLists,
  });

// ****************************************************************************
// SAVE EXERCISE LIST
const saveExerciseList = async (exerciseList: ApiExerciseList, auth?: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercise-lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth || '',
    },
    body: JSON.stringify(exerciseList),
  });

  if (!response.ok) {
    throw new Error('Failed to save exercise list');
  }
};

const useSaveExerciseList = (): UseMutationResult<void, Error, ApiExerciseList> => {
  // AUTH
  const [user] = useCurrentUser();

  // RQ
  const queryClient = useQueryClient();

  // METHODS
  const saveExerciseListAuth = async (exerciseList: ApiExerciseList): Promise<void> =>
    saveExerciseList(exerciseList, user?.authorization);

  return useMutation({
    mutationFn: saveExerciseListAuth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXERCISELISTS] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// ****************************************************************************
// DELETE EXERCISE
const deleteExerciseList = async (exerciseListId: number, auth?: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercise-lists/${exerciseListId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth || '',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete exercise list ${exerciseListId}`);
  }
};

const useDeleteExerciseList = (): UseMutationResult<void, Error, number> => {
  // AUTH
  const [user] = useCurrentUser();

  // RQ
  const queryClient = useQueryClient();

  // METHODS
  const deleteExerciseListAuth = async (exerciseListId: number): Promise<void> =>
    deleteExerciseList(exerciseListId, user?.authorization);

  return useMutation({
    mutationFn: deleteExerciseListAuth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXERCISELISTS] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export { useExerciseLists, useSaveExerciseList, useDeleteExerciseList };
