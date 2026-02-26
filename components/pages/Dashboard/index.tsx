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
          <div className="flex h-full w-full flex-col gap-4 overflow-hidden border-2 border-green-500 p-4">
            <CreateExerciseListForm />
            <Button className="ml-auto" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}
      <div className="flex h-screen w-screen flex-col justify-between pb-6">
        <div className="mt-8 flex w-full flex-col gap-4 px-4">
          <h1 className="mb-4 text-2xl font-bold">Tableau de bord</h1>
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
