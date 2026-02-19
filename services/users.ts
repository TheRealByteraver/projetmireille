import { users } from '@/data';
import { User } from '@/types/frontend';

const useUsers = (): User[] =>
  users.map((user) => ({
    ...user,
    password: '*********',
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  }));

export { useUsers };
