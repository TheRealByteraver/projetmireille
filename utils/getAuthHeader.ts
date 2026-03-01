import { Credentials } from '@/services/users';

const getAuthHeader = (credentials: Credentials): string =>
  'Basic ' + Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');

export default getAuthHeader;
