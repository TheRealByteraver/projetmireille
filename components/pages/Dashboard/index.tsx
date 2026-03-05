'use client';
import CreateExerciseListModal from '@/components/pages/CreateExerciseListModal';
import getColumns from '@/components/pages/Dashboard/columns';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ReactTable from '@/components/ui/ReactTable';
import { useDeleteExerciseList, useExerciseLists } from '@/services/exerciseList';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PresentExerciseListModal from '../PresentExerciseListModal';
import Dialog from '@/components/ui/Dialog';

const Dashboard = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // RQ
  const { data: exerciseLists = [], isLoading, error } = useExerciseLists();
  const { mutate: deleteExerciseList } = useDeleteExerciseList();
  // STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'present' | 'delete' | null>(null);
  const [selectedExerciseListId, setSelectedExerciseListId] = useState<number | null>(null);

  // METHODS
  const handleCreateExerciseList = () => {
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handlePresentExerciseList = (exerciseListId: number) => {
    setSelectedExerciseListId(exerciseListId);
    setModalMode('present');
    setIsModalOpen(true);
  };

  const handleDeleteExerciseList = (exerciseListId: number) => {
    setSelectedExerciseListId(exerciseListId);
    setModalMode('delete');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMode(null);
  };

  // VARS
  const emptyTable = exerciseLists.length === 0 && !isLoading && !error;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} fullSize={['create', 'present'].includes(modalMode ?? '')} closeModal={closeModal}>
          {modalMode === 'create' && <CreateExerciseListModal closeModal={closeModal} />}
          {modalMode === 'present' && (
            <PresentExerciseListModal
              exerciseList={exerciseLists.find((exerciseList) => exerciseList.id === selectedExerciseListId)}
              closeModal={closeModal}
            />
          )}
        </Modal>
      )}

      <Dialog
        isOpen={modalMode === 'delete'}
        closeModal={closeModal}
        buttons={[
          { label: 'Annuler', value: 'cancel', color: 'white' },
          { label: 'Supprimer', value: 'delete', color: 'red' },
        ]}
        onButtonClick={(value) => {
          if (value === 'delete' && selectedExerciseListId) deleteExerciseList(selectedExerciseListId);
          closeModal();
        }}
        title="Supprimer la série d'exercices"
        text="Êtes-vous sûr de vouloir supprimer cette série d'exercices?"
      />

      <div className="flex h-full w-full flex-col justify-between pb-6">
        <div className="flex w-full flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          {isLoading && <div>Chargement des séries d&apos;exercices...</div>}
          {emptyTable && <div>Aucune série d&apos;exercices trouvée, créez une nouvelle série d&apos;exercices.</div>}
          {!emptyTable && (
            <ReactTable
              data={exerciseLists}
              columns={getColumns(handlePresentExerciseList, handleDeleteExerciseList)}
            />
          )}

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
