'use client';
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

  // EFFECTS
  useEffect(() => {
    if (!user) {
      redirect('/login');
    }
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="flex h-8 items-center bg-blue-600 pl-2 font-semibold text-white">
        Utilisateur connecté: {user.firstName} {user.lastName}
      </header>
      {children}
    </div>
  );
};

export default AuthenticatedRoute;
