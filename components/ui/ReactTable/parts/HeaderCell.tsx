import { flexRender, Header } from '@tanstack/react-table';

import DeleteButton from './DeleteButton';
import SortIcon from './SortIcon';
import styles from '../ReactTable.module.css';

type Props<T> = {
  header: Header<T, unknown>;
  wrapHeaders: boolean;
  index: number;
  selectedRows: T[];
  deleteRows?: (selectedRows: T[]) => void;
  deletionStatus?: 'error' | 'idle' | 'pending' | 'success';
};

const HeaderCell = <T,>(props: Props<T>): React.JSX.Element => {
  // PROPS
  const { header, wrapHeaders, index, selectedRows, deleteRows, deletionStatus } = props;

  // METHODS
  const handleSort = (): void => header.column.toggleSorting();

  const handleDeleteRows = (): void => {
    if (deleteRows) deleteRows(selectedRows);
  };

  // VARS
  const isCheckbox = header.id === 'select';
  const secondColumn = index === 1;
  const showDeleteButton = secondColumn && selectedRows.length > 0;

  return (
    <th
      key={header.id}
      scope="col"
      className={[
        'bg-gray-50',
        styles.cell_header,
        !wrapHeaders && 'whitespace-nowrap',
        isCheckbox ? styles.cell_header_checkbox : 'pl-4 pr-3 sm:pl-6',
        !showDeleteButton && 'py-3.5',
      ].join(' ')}
    >
      {showDeleteButton ? (
        <DeleteButton
          handleDeleteRows={handleDeleteRows}
          deletionStatus={deletionStatus}
          rowsLength={selectedRows.length}
        />
      ) : (
        <span className="inline-flex items-center w-full group">
          {flexRender(header.column.columnDef.header, header.getContext())}
          {header.column.getCanSort() && <SortIcon isSorted={header.column.getIsSorted()} handleSort={handleSort} />}
        </span>
      )}
    </th>
  );
};

export default HeaderCell;
