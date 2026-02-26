import { ApiExerciseList } from '@/types/apiTypes';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const EXERCISELISTS = 'exercise-lists';

const fetchExerciseLists = async (): Promise<ApiExerciseList[]> => {
  const response = await fetch('http://localhost:5000/api/exercise-lists');
  const data = await response.json();

  // console.log(data);
  return data;
};

const useExerciseLists = (): UseQueryResult<ApiExerciseList[], Error> =>
  useQuery({
    queryKey: [EXERCISELISTS],
    queryFn: fetchExerciseLists,
  });

export { useExerciseLists };
