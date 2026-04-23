'use client';
import Button from '@/components/ui/generic/Button';
import useCurrentUser from '@/hooks/useCurrentUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LandingPage = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // AUTH
  const [user, setCurrentUser] = useCurrentUser();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <h1 className="my-6 text-center text-5xl font-bold text-gray-500">Droites numériques</h1>
      <div className="flex w-full flex-col items-center">
        {/* original size: 878x878 */}
        <Image src="/home.jpg" width={600} height={600} alt="Project logo" loading="eager" />
        <div className="mt-4 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          {user && (
            <Button onClick={() => router.push('/dashboard')} color="blue">
              Tableau de bord
            </Button>
          )}

          <Button onClick={() => router.push('/practice')} color="blue">
            Pratique
          </Button>

          {user ? (
            <Button onClick={() => setCurrentUser(undefined)} color="indigo">
              Se déconnecter
            </Button>
          ) : (
            <Button onClick={() => router.push('/login')} color="indigo">
              Se connecter
            </Button>
          )}
        </div>
        <p className="my-6 text-center text-gray-500">
          &quot;Droites numériques&quot; est un projet educatif pour les enfants d&apos;école primaire.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
