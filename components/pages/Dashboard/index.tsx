'use client';
import columns from '@/components/pages/Dashboard/columns';
import Button from '@/components/ui/Button';
import ReactTable from '@/components/ui/ReactTable';
import { useExerciseLists } from '@/services/exerciseList';
import { useRouter } from 'next/navigation';

const Dashboard = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // HOOKS
  const { data: exerciseLists = [], isLoading, error } = useExerciseLists();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-screen w-screen flex flex-col justify-between pb-6">
      <div className="w-full mt-8 px-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
        <Button className="sm:mr-auto" color="green">
          Creer une nouvelle série d&apos;exercises
        </Button>
        <ReactTable data={exerciseLists} columns={columns} />
      </div>
      <div className="ml-4">
        <Button onClick={() => router.push('/')} color="green">
          Page principale
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
