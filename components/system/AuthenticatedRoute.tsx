import { useEffect } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const AuthenticatedRoute = (props: Props): React.JSX.Element => {
  // PROPS
  const { children } = props;

  // AUTH
  const [user] = useCurrentUser();
  console.log('user in AuthenticatedRoute: ', user);

  // EFFECTS
  useEffect(() => {
    if (!user) {
      redirect('/login');
    }
  }, [user]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="flex h-16 items-center justify-between bg-white px-4"></header>
      {children}
    </div>
  );
};

export default AuthenticatedRoute;
