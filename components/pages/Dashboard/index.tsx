'use client';
import CreateExerciseListModal from '@/components/pages/Dashboard/parts/CreateExerciseListModal';
import getColumns from '@/components/pages/Dashboard/columns';
import Button from '@/components/ui/generic/Button';
import Modal from '@/components/ui/generic/Modal';
import ReactTable from '@/components/ui/generic/ReactTable';
import { useDeleteExerciseList, useExerciseLists } from '@/services/exerciseList';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PresentExerciseListModal from './parts/PresentExerciseListModal';
import Dialog from '@/components/ui/generic/Dialog';
import SelectForPresentationModal from './SelectForPresentationModal';
import PresentExerciseListsModal from './parts/PresentExerciseListsModal';

type ModalStates = 'create' | 'present' | 'delete' | 'preview' | 'presentSelect' | null;

const Dashboard = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // RQ
  const { data: exerciseLists = [], isLoading, error } = useExerciseLists();
  const { mutate: deleteExerciseList } = useDeleteExerciseList();
  // STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalStates>(null);
  const [selectedExerciseListId, setSelectedExerciseListId] = useState<number | null>(null);
  const [presentExerciseListIds, setPresentExerciseListIds] = useState<number[]>([]);

  // METHODS
  const handleCreateExerciseList = () => {
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handlePreviewExerciseList = (exerciseListId: number) => {
    setSelectedExerciseListId(exerciseListId);
    setModalMode('preview');
    setIsModalOpen(true);
  };

  const handlePresentExerciseList = () => {
    setModalMode('presentSelect');
    setIsModalOpen(true);
  };

  const handleDeleteExerciseList = (exerciseListId: number) => {
    setSelectedExerciseListId(exerciseListId);
    setModalMode('delete');
  };

  const closeModal = () => {
    setPresentExerciseListIds([]);
    setIsModalOpen(false);
    setModalMode(null);
  };

  // VARS
  const emptyTable = exerciseLists.length === 0 && !isLoading && !error;
  const selectedExerciseList = exerciseLists.find((exerciseList) => exerciseList.id === selectedExerciseListId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          fullSize={['create', 'preview', 'present'].includes(modalMode ?? '')}
          closeModal={closeModal}
          closeOnOutsideClick={modalMode === 'create' ? false : true}
        >
          {modalMode === 'create' && <CreateExerciseListModal closeModal={closeModal} />}
          {modalMode === 'preview' && (
            <PresentExerciseListModal exerciseList={selectedExerciseList} closeModal={closeModal} />
          )}
          {modalMode === 'presentSelect' && (
            <SelectForPresentationModal
              exerciseLists={exerciseLists}
              setExerciseListIds={(ids: number[]) => {
                setPresentExerciseListIds(ids);
                setModalMode('present');
              }}
              closeModal={closeModal}
            />
          )}
          {modalMode === 'present' &&
            (presentExerciseListIds.length === 1 ? (
              <PresentExerciseListModal
                exerciseList={exerciseLists.find((exerciseList) => presentExerciseListIds.includes(exerciseList.id))}
                closeModal={closeModal}
              />
            ) : (
              <PresentExerciseListsModal
                exerciseLists={exerciseLists.filter((exerciseList) => presentExerciseListIds.includes(exerciseList.id))}
                closeModal={closeModal}
              />
            ))}
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
        text={`Êtes-vous sûr de vouloir supprimer la série d'exercices nommée "${selectedExerciseList?.name}" ?`}
      />

      <div className="flex h-full w-full flex-col justify-between gap-4 overflow-y-auto p-4">
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          {isLoading && <div>Chargement des séries d&apos;exercices...</div>}
          {emptyTable && <div>Aucune série d&apos;exercices trouvée, créez une nouvelle série d&apos;exercices.</div>}
          {!emptyTable && (
            <ReactTable
              data={exerciseLists}
              columns={getColumns(handlePreviewExerciseList, handleDeleteExerciseList)}
              showColumnsWidths={['md', '', 'md', 'sm', '', '']}
            />
          )}

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between">
            <Button className="w-full sm:w-auto" color="green" onClick={handlePresentExerciseList}>
              Présenter plusieurs séries d&apos;exercices
            </Button>

            <Button className="w-full sm:w-auto" color="green" onClick={handleCreateExerciseList}>
              Créer une nouvelle série d&apos;exercices
            </Button>
          </div>
        </div>
        <Button className="w-full sm:mr-auto sm:w-auto" onClick={() => router.push('/')} color="white">
          Page d&apos;accueil
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
