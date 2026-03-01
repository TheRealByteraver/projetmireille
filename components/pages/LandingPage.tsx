'use client';
import Button from '@/components/ui/Button';
import useCurrentUser from '@/hooks/useCurrentUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LandingPage = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // AUTH
  const [user, setCurrentUser] = useCurrentUser();
  console.log('user in LandingPage: ', user);

  return (
    <>
      <h1 className="my-6 text-center text-5xl font-bold text-gray-500">Projet Mireille</h1>
      <div className="flex w-full flex-col items-center">
        {/* original size: 878x878 */}
        <Image src="/home.jpg" width={600} height={600} alt="Project logo" loading="eager" />
        <div className="mt-4 flex gap-4">
          {user ? (
            <Button onClick={() => setCurrentUser(undefined)} color="blue">
              Se déconnecter
            </Button>
          ) : (
            <Button onClick={() => router.push('/login')} color="blue">
              Se connecter
            </Button>
          )}

          <Button onClick={() => router.push('/practice')} color="green">
            Pratique
          </Button>
        </div>
        <p className="my-6 text-gray-500">Projet Mireille est un projet educatif pour les enfants de 9 à 11 ans.</p>
      </div>
    </>
  );
};

export default LandingPage;
