import { ApiExerciseList } from '@/types/apiTypes';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const EXERCISELISTS = 'exercise-lists';

const fetchExerciseLists = async (): Promise<ApiExerciseList[]> => {
  const response = await fetch('/api/exercise-lists');
  return response.json();
};

const useExerciseLists = (): UseQueryResult<ApiExerciseList[], Error> =>
  useQuery({
    queryKey: [EXERCISELISTS],
    queryFn: fetchExerciseLists,
  });

export { useExerciseLists };
