'use client';
import columns from '@/components/pages/Dashboard/columns';
import Button from '@/components/ui/Button';
import ReactTable from '@/components/ui/ReactTable';
import { exerciseList } from '@/data';
import { useRouter } from 'next/navigation';

const Dashboard = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col justify-between pb-6">
      <div className="w-full mt-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
        <ReactTable data={exerciseList} columns={columns} />
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
