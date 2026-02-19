import { useState } from 'react';
import { User } from '@/types/frontend';

const Login = (): React.JSX.Element => {
  // HOOKS
  const [user, setUser] = useState<User | null>(null);

  // HANDLERS
  const handleLogin = (username: string, password: string) => {
    const user = users.find((user) => user.username === username && user.password === password);
    setUser(user);
  };

  return <div>Login</div>;
};

export default Login;
