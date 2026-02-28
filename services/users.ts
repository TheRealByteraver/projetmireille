import { ApiUser } from '@/types/apiTypes';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const USERS = 'users';

// ****************************************************************************
// GET USER

type Credentials = {
  username: string;
  password: string;
};

const fetchUser = async (credentials: Credentials): Promise<ApiUser> => {
  const { username, password } = credentials;
  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  });

  const data = await response.json();
  return data;
};

const useUser = (credentials: Credentials, enabled?: boolean): UseQueryResult<ApiUser, Error> =>
  useQuery({
    queryKey: [USERS, credentials.username],
    queryFn: () => fetchUser(credentials),
    enabled,
  });

// ****************************************************************************
//

export { useUser };

export type { Credentials };
