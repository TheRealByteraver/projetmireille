import { Column } from '@tanstack/react-table';

import { Input } from 'components/ui';
import { getFormattedTimeStr } from 'utils';

type Props<T> = {
  label: string;
  column: Column<T, unknown>;
};

const DateRangeFilter = <T,>({ label, column }: Props<T>): React.JSX.Element => {
  // METHODS
  const clearFilter = (): void => column.setFilterValue([]);

  const handleOnChange = (value: string, inputType: 'min' | 'max'): void => {
    if (inputType === 'min') {
      column.setFilterValue((prev: [string, string]) => [value, prev?.[1]]);
    } else {
      column.setFilterValue((prev: [string, string]) => [prev?.[0], value]);
    }
  };

  // VARS
  const columnFilterValue = column.getFilterValue() as [string, string];

  const maxFromValue = columnFilterValue && getFormattedTimeStr(columnFilterValue[1], 'YYYY-MM-DD');
  const minUntilValue =
    columnFilterValue && getFormattedTimeStr(columnFilterValue[0], 'YYYY-MM-DD');

  return (
    <div className="flex flex-col items-start gap-4 text-sm text-gray-500 md:gap-2 sm:mx-0 md:flex-row md:items-center">
      <div className="flex items-center justify-between w-full pl-1 md:w-auto md:pl-0">
        <span>{label}</span>
        <button
          onClick={clearFilter}
          title="clear"
          className="mr-4 font-medium text-green-600 hover:text-green-800 md:hidden"
        >
          Clear
        </button>
      </div>

      <Input
        type="date"
        className="w-full m-0"
        label="From"
        max={maxFromValue}
        value={(columnFilterValue as [string, string])?.[0] ?? ''}
        onChange={(e): void => handleOnChange((e.target as HTMLInputElement).value, 'min')}
      />

      <Input
        type="date"
        className="w-full m-0"
        label="Until"
        min={minUntilValue}
        value={(columnFilterValue as [string, string])?.[1] ?? ''}
        onChange={(e): void => handleOnChange((e.target as HTMLInputElement).value, 'max')}
      />

      <button
        onClick={clearFilter}
        title="clear"
        className="hidden font-medium text-green-600 hover:text-green-800 md:block"
      >
        Clear
      </button>
    </div>
  );
};

export default DateRangeFilter;
