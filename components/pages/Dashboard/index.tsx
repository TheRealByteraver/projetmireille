'use client';
import CreateExerciseListForm from '@/components/pages/CreateExerciseListForm';
import columns from '@/components/pages/Dashboard/columns';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ReactTable from '@/components/ui/ReactTable';
import { useExerciseLists } from '@/services/exerciseList';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Dashboard = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // STATE
  const [isModalOpen, setIsModalOpen] = useState(false);

  // HOOKS
  const { data: exerciseLists = [], isLoading, error } = useExerciseLists();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          <div className="h-full w-full flex flex-col gap-4 p-4">
            <CreateExerciseListForm />
            <Button className="ml-auto" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}
      <div className="h-screen w-screen flex flex-col justify-between pb-6">
        <div className="w-full mt-8 px-4 flex flex-col gap-4">
          <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
          <Button className="sm:mr-auto" color="green" onClick={() => setIsModalOpen(true)}>
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
    </>
  );
};

export default Dashboard;
