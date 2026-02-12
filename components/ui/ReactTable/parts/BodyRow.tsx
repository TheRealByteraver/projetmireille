import { Row } from '@tanstack/react-table';

import { isEven } from 'utils';

import BodyCell from './BodyCell';
import styles from '../ReactTable.module.css';

type Props<T> = {
  row: Row<T>;
  index: number;
  canGroup: boolean;
};
const BodyRow = <T,>({ row, index, canGroup }: Props<T>): React.JSX.Element => {
  // VARS
  const groupingStyle = row.getCanExpand() ? styles['grouped-row'] : 'bg-white';
  const standardStyle = isEven(index) ? 'bg-white' : 'bg-gray-50';
  const className = canGroup ? groupingStyle : standardStyle;

  // METHODS
  const handleRowOnClick = (): void => {
    if (row.getCanExpand()) row.toggleExpanded(!row.getIsExpanded());
  };

  return (
    <tr className={`${className} show_on_hover`} onClick={handleRowOnClick}>
      {row.getVisibleCells().map((cell) => (
        <BodyCell key={cell.id} row={row} cell={cell} />
      ))}
    </tr>
  );
};

export default BodyRow;
