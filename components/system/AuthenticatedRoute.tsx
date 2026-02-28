import { useState } from 'react';
import { User } from '@/types/frontend';

type Props = {
  children: React.ReactNode;
};

const AuthenticatedRoute = (props: Props): React.JSX.Element => {
  // PROPS
  const { children } = props;

  // HOOKS
  const [user, setUser] = useState<User | null>(null);

  // HANDLERS
  // const handleLogin = (username: string, password: string) => {
  //   const user = users.find((user) => user.username === username && user.password === password);
  //   setUser(user);
  // };

  // if (!user) {

  //   redirect('/login');

  //   return <Login />;
  // }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="flex h-16 items-center justify-between bg-white px-4"></header>
      {children}
    </div>
  );
};

export default AuthenticatedRoute;
