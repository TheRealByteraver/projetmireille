import { ReactNode, useCallback } from 'react';

import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Cell, flexRender, Row } from '@tanstack/react-table';
import classNames from 'classnames';

import styles from '../ReactTable.module.css';

type Props<T> = {
  row: Row<T>;
  cell: Cell<T, unknown>;
};

const BodyCell = <T,>({ row, cell }: Props<T>): React.JSX.Element => {
  // METHODS
  const renderCell = (): ReactNode | null => {
    if (cell.getIsAggregated() || cell.getIsPlaceholder()) return null;
    else return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  const renderChevron = useCallback((isExpanded: boolean): React.JSX.Element => {
    if (isExpanded) return <ChevronDownIcon className="w-4 h-4 mr-2" />;
    else return <ChevronRightIcon className="w-4 h-4 mr-2" />;
  }, []);

  // VARS
  const isGrouped = row.getCanExpand() && cell.column.getIsGrouped();
  const isCheckbox = cell.column.id === 'select';

  return (
    <td
      onClick={(): void => row.toggleExpanded()}
      style={{ height: '1px' }} // allows for full-height children
      className={classNames(
        'relative',
        isCheckbox ? styles.cell_body_checkbox : styles.cell,
        isGrouped && 'flex items-center select-none cursor-pointer',
      )}
    >
      {isGrouped && renderChevron(row.getIsExpanded())}
      {renderCell()}
    </td>
  );
};

export default BodyCell;
