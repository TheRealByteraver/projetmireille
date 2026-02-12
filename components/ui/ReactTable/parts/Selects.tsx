import { Row } from '@tanstack/react-table';
import classNames from 'classnames';

import { Button } from 'components/ui';
import { SelectConditions } from 'types';
import { PATHS } from 'utils/constants';
import { useCheckPath } from 'utils/hooks';

type SelectButton = { text: string; conditions: SelectConditions };

type Props<T> = {
  selectButtons: SelectButton[];
  rows: Row<T>[];
  selectedRows: T[];
};

const Selects = <T,>({ selectButtons, rows, selectedRows }: Props<T>): React.JSX.Element => {
  // HOOK
  const isOnOverview = useCheckPath(PATHS.overview);

  // METHODS
  const isAllSelected = (conditions: SelectConditions): boolean => {
    if (selectedRows.length === 0) return false;
    const accessors = Object.keys(conditions);

    // 1. count of all rows matching conditions === count of selectedRows
    let totalRowsCount = 0;
    accessors.forEach((accessor) => {
      totalRowsCount += rows.filter(
        (row) => row.original[accessor as keyof typeof row.original] === conditions[accessor],
      ).length;
    });

    if (selectedRows.length !== totalRowsCount) return false;

    // 2. all selected rows match the conditions
    let result = true;
    selectedRows.forEach((original) => {
      accessors.forEach((accessor) => {
        if (original[accessor as keyof typeof original] !== conditions[accessor]) {
          result = false;
        }
      });
    });
    return result;
  };

  const handleSelectRows = (conditions: SelectConditions): void => {
    const accessors = Object.keys(conditions);
    const isAlreadySelected = isAllSelected(conditions);

    rows.map((row) => {
      accessors.map((accessor) => {
        const isMatchingCondition =
          row.original[accessor as keyof typeof row.original] === conditions[accessor];
        row.toggleSelected(isMatchingCondition && !isAlreadySelected);
      });
    });
  };

  // VARS
  const filteredSelectButtons: SelectButton[] = [];
  selectButtons.forEach((button) => {
    const accessors = Object.keys(button.conditions);
    accessors.forEach((accessor) => {
      if (
        rows.some(
          (row) =>
            row.original[accessor as keyof typeof row.original] === button.conditions[accessor],
        )
      ) {
        filteredSelectButtons.push(button);
      }
    });
  });

  return (
    <div
      className={classNames(
        'flex items-start justify-between sm:items-center',
        isOnOverview ? 'mr-4' : '',
      )}
    >
      <div className="flex flex-col w-full mr-2 space-y-2 sm:space-y-0 sm:items-center sm:flex-row sm:space-x-6">
        <div className="flex items-center space-x-2">
          <span className="py-2 text-sm text-gray-500">Select:</span>
          {filteredSelectButtons.map((button, index) => (
            <Button
              key={index}
              onClick={(): void => handleSelectRows(button.conditions)}
              title="Select all SELL orders"
              color={isAllSelected(button.conditions) ? 'purple' : 'white'}
              size="sm"
            >
              {button.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Selects;
