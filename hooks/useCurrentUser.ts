'use client';
import { Credentials } from '@/services/users';
import { CurrentUser } from '@/types/frontend';
import getAuthHeader from '@/utils/getAuthHeader';
import { useCallback, useState } from 'react';

function getUserFromLocalStorage(): CurrentUser | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

type ReturnType = [CurrentUser | null, (user?: CurrentUser, credentials?: Credentials) => void];

const useCurrentUser = (): ReturnType => {
  // STATE
  const [user, setUser] = useState<CurrentUser | null>(getUserFromLocalStorage);

  // METHODS
  const setCurrentUser = useCallback(
    (user?: CurrentUser, credentials?: Credentials): void => {
      if (!user || !credentials?.username || !credentials?.password) {
        setUser(null);
        localStorage.removeItem('user');
      } else {
        const currentUser = {
          ...user,
          authorization: getAuthHeader(credentials),
        };
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      }
    },
    [setUser],
  );

  return [user, setCurrentUser];
};

export default useCurrentUser;
