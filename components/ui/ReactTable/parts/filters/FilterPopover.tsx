import { useEffect, useState } from 'react';

import { FunnelIcon } from '@heroicons/react/24/outline';
import { Column } from '@tanstack/react-table';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { PopoverButton, IconButton, Input } from 'components/ui';
import { OptionType, ServerSideFiltering } from 'types';
import { useDebounce } from 'utils/hooks';

import DateRangeFilter from './DateRangeFilter';
import NumberRangeFilter from './NumberRangeFilter';

type Props<T> = {
  serverSideFiltering: ServerSideFiltering;
  columns: Column<T, unknown>[];
};

const FilterPopover = <T,>({ serverSideFiltering, columns }: Props<T>): React.JSX.Element => {
  // STATE
  const [filterValue, setFilterValue] = useState<{ accessor: string; value: string }>();

  // RHF
  const { register, resetField, control } = useForm();

  // HOOKS
  const debouncedFilterValue = useDebounce(filterValue, 500);

  useEffect(() => {
    if (!debouncedFilterValue) return;

    // update column filtering on debounce
    const column = columns.find((col) => col.id === debouncedFilterValue.accessor);
    if (column) column.setFilterValue(debouncedFilterValue.value);
  }, [debouncedFilterValue, columns]);

  // METHODS
  const clearFilter = (accessor: string): void => {
    resetField(accessor);
    const column = columns.find((col) => col.id === accessor);
    if (column) column.setFilterValue([]);
  };

  // VARS
  const triggerButton = (
    <IconButton srOnlyText="Open filters menu">
      <FunnelIcon className="w-5 h-5" aria-hidden="true" />
    </IconButton>
  );

  return (
    <PopoverButton reactEl={triggerButton}>
      <div className="space-y-4">
        {serverSideFiltering.popoverFilters &&
          serverSideFiltering.popoverFilters.map((filter) => {
            const column = columns.find((col) => col.id === filter.accessor);
            if (!column) return;

            if (['string', 'number'].includes(filter.type)) {
              return (
                <div key={filter.label} className="flex items-center space-x-2">
                  <Input
                    {...register(filter.accessor)}
                    className="flex-1"
                    type={filter.type}
                    label={filter.label}
                    onChange={(e): void =>
                      setFilterValue({
                        accessor: filter.accessor,
                        value: (e.target as HTMLInputElement).value,
                      })
                    }
                  />
                  <button
                    onClick={(): void => clearFilter(filter.accessor)}
                    title="clear"
                    className="hidden text-sm font-medium text-green-600 hover:text-green-800 sm:block"
                  >
                    Clear
                  </button>
                </div>
              );
            } else if (filter.type === 'range') {
              return <NumberRangeFilter key={filter.label} label={filter.label} column={column} />;
            } else if (filter.type === 'dateRange') {
              return <DateRangeFilter key={filter.label} label={filter.label} column={column} />;
            } else if (filter.type === 'date') {
              return (
                <div key={filter.label} className="flex items-center space-x-2">
                  <Input
                    {...register(filter.accessor)}
                    className="flex-1"
                    type={filter.type}
                    label={filter.label}
                    onChange={(e): void =>
                      setFilterValue({
                        accessor: filter.accessor,
                        value: (e.target as HTMLInputElement).value,
                      })
                    }
                  />
                  <button
                    onClick={(): void => clearFilter(filter.accessor)}
                    title="clear"
                    className="hidden text-sm font-medium text-green-600 hover:text-green-800 sm:block"
                  >
                    Clear
                  </button>
                </div>
              );
            } else if (filter.type === 'select') {
              const selectOptions = filter.options?.map((option) => ({
                label: option,
                value: option,
              }));

              const handleChange =
                (onChange: (value: string) => void) =>
                (option: OptionType | null): void => {
                  const newValue = option?.value as string;
                  if (!newValue) return;
                  onChange(newValue);
                  setFilterValue({
                    accessor: filter.accessor,
                    value: newValue,
                  });
                };

              return (
                <div key={filter.label} className="flex items-center space-x-2">
                  <Controller
                    key={filter.label}
                    name={filter.accessor}
                    control={control}
                    render={({ field: { value, onChange } }): React.JSX.Element => (
                      <Select
                        className="flex-1 react-select-remove-ring"
                        options={selectOptions}
                        placeholder={filter.label}
                        value={selectOptions?.find((option) => option.value === value) || null}
                        onChange={handleChange(onChange)}
                      />
                    )}
                  />
                  <button
                    onClick={(): void => clearFilter(filter.accessor)}
                    title="clear"
                    className="hidden text-sm font-medium text-green-600 hover:text-green-800 sm:block"
                  >
                    Clear
                  </button>
                </div>
              );
            }
          })}
      </div>
    </PopoverButton>
  );
};

export default FilterPopover;
