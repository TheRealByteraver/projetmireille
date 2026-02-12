import { Column } from '@tanstack/react-table';

import { Input } from 'components/ui';

type Props<T> = {
  label: string;
  column: Column<T, unknown>;
};

const NumberRangeFilter = <T,>({ label, column }: Props<T>): React.JSX.Element => {
  // METHODS
  const clearFilter = (): void => column.setFilterValue([]);

  const handleOnChange = (value: string, inputType: 'min' | 'max'): void => {
    if (inputType === 'min') {
      column.setFilterValue((old: [number, number]) => [value, old?.[1]]);
    } else {
      column.setFilterValue((old: [number, number]) => [old?.[0], value]);
    }
  };

  // VARS
  const minValue = column.getFacetedMinMaxValues()?.[0];
  const maxValue = column.getFacetedMinMaxValues()?.[1];
  const columnFilterValue = column.getFilterValue();

  return (
    // eslint-disable-next-line max-len
    <div className="flex flex-col items-start mx-2 space-y-2 text-sm text-gray-500 sm:space-x-2 sm:mx-0 sm:flex-row sm:items-center">
      <div className="flex items-center justify-between w-full pl-1 sm:w-auto sm:pl-0 sm:mt-2">
        <span>{label}</span>
        <button
          onClick={clearFilter}
          title="clear"
          className="mr-4 font-medium text-green-600 hover:text-green-800 sm:hidden"
        >
          Clear
        </button>
      </div>
      <Input
        type="number"
        className="w-full m-0"
        min={Number(minValue ?? '')}
        max={Number(maxValue ?? '')}
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e): void => handleOnChange((e.target as HTMLInputElement).value, 'min')}
        placeholder={`Min ${minValue ? `(${minValue})` : ''}`}
      />
      <Input
        type="number"
        className="w-full m-0"
        min={Number(minValue ?? '')}
        max={Number(maxValue ?? '')}
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e): void => handleOnChange((e.target as HTMLInputElement).value, 'max')}
        placeholder={`Max ${maxValue ? `(${maxValue})` : ''}`}
      />
      <button
        onClick={clearFilter}
        title="clear"
        className="hidden font-medium text-green-600 hover:text-green-800 sm:block"
      >
        Clear
      </button>
    </div>
  );
};

export default NumberRangeFilter;
