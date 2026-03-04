'use client';
import CreateExerciseListModal from '@/components/pages/CreateExerciseListModal';
import columns from '@/components/pages/Dashboard/columns';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ReactTable from '@/components/ui/ReactTable';
import { useExerciseLists } from '@/services/exerciseList';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PresentExerciseListModal from '../PresentExerciseListModal';

const Dashboard = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // RQ
  const { data: exerciseLists = [], isLoading, error } = useExerciseLists();

  // STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'present' | null>(null);
  const [selectedExerciseListId, setSelectedExerciseListId] = useState<number | null>(null);

  // METHODS
  const handlePresentExerciseList = (exerciseListId: number) => {
    setSelectedExerciseListId(exerciseListId);
    setModalMode('present');
    setIsModalOpen(true);
  };

  const handleCreateExerciseList = () => {
    setModalMode('create');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMode(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          {modalMode === 'create' && <CreateExerciseListModal closeModal={closeModal} />}
          {modalMode === 'present' && (
            <PresentExerciseListModal
              exerciseList={exerciseLists.find((exerciseList) => exerciseList.id === selectedExerciseListId)}
              closeModal={closeModal}
            />
          )}
        </Modal>
      )}

      <div className="flex h-full w-full flex-col justify-between pb-6">
        <div className="mt-4 flex w-full flex-col gap-4 px-4">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <ReactTable data={exerciseLists} columns={columns(handlePresentExerciseList)} />

          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
            <Button onClick={() => router.push('/')} color="white">
              Page d&apos;accueil
            </Button>
            <Button color="green" onClick={handleCreateExerciseList}>
              Creer une nouvelle série d&apos;exercises
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
