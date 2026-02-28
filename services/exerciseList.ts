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
const saveExerciseList = async (exerciseList: ApiExerciseList): Promise<ApiExerciseList> => {
  const username = 'mireille';
  const password = 'mireille';
  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercise-lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
    body: JSON.stringify(exerciseList),
  });

  const data = await response.json(); // TODO: check
  return data;
};

const useSaveExerciseList = (): UseMutationResult<ApiExerciseList, Error, ApiExerciseList> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveExerciseList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXERCISELISTS] });
    },
  });
};

export { useExerciseLists, useSaveExerciseList };
