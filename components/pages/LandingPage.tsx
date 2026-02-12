'use client';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LandingPage = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  return (
    <>
      <h1 className="text-5xl font-bold text-center text-gray-500 my-6">Projet Mireille</h1>
      <div className="w-full flex flex-col items-center">
        <Image src="/home.jpg" width={878} height={878} alt="Project logo" loading="eager" />
        <div className="flex gap-4 mt-4">
          <Button onClick={() => router.push('/dashboard')} color="blue">
            Tableau de bord
          </Button>

          <Button onClick={() => router.push('/practice')} color="green">
            Pratique
          </Button>
        </div>
        <p className="text-gray-500 my-6">Projet Mireille est un projet educatif pour les enfants de 9 à 11 ans.</p>
      </div>
    </>
  );
};

export default LandingPage;
