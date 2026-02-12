'use client';
import columns from '@/components/pages/Dashboard/columns';
import Button from '@/components/ui/Button';
import ReactTable from '@/components/ui/ReactTable';
import { useRouter } from 'next/navigation';

const Dashboard = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // VARS
  const data = [
    {
      firstName: 'Tanner',
      lastName: 'Linsley',
      age: 33,
      visits: 100,
      progress: 50,
      status: 'Married',
    },
    {
      firstName: 'Kevin',
      lastName: 'Vandy',
      age: 27,
      visits: 200,
      progress: 100,
      status: 'Single',
    },
    {
      firstName: 'Erland',
      lastName: 'Van Olmen',
      age: 49,
      visits: 173,
      progress: 78,
      status: 'Single',
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col justify-between pb-6">
      <div className="w-full mt-8 px-4">
        <h1>dashboard</h1>
        <ReactTable data={data} columns={columns} />
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
