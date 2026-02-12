import { CountBadge, Spinner } from 'components/ui';

import styles from '../ReactTable.module.css';

type Props = {
  handleDeleteRows: () => void;
  deletionStatus?: 'error' | 'idle' | 'pending' | 'success';
  rowsLength: number;
};

const DeleteButton = ({
  handleDeleteRows,
  deletionStatus,
  rowsLength,
}: Props): React.JSX.Element => (
  <button type="button" onClick={handleDeleteRows} className={styles['delete-button']}>
    {deletionStatus === 'pending' ? (
      <>
        <span>Deleting</span>
        <Spinner size="small" />
      </>
    ) : (
      <>
        <span>Delete</span>
        <CountBadge count={rowsLength} />
      </>
    )}
  </button>
);

export default DeleteButton;
