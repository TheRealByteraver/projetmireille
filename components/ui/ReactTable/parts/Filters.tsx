import { Column } from '@tanstack/react-table';
import classNames from 'classnames';
import Select, { ActionMeta, SingleValue } from 'react-select';

import { Button } from 'components/ui';
import { FilteredColumns } from 'types';
import { PATHS } from 'utils/constants';
import { useCheckPath } from 'utils/hooks';

type FilterButton = { accessor: string; label: string; filterBy: unknown };
type SelectOption = FilterButton & { value: string };

type Props<T> = {
  columns: Column<T, unknown>[];
  filteredColumns: FilteredColumns;
  serverSideFilters?: {
    label: string;
    filterBy: string;
    accessor: string;
  }[];
};

const Filters = <T,>(props: Props<T>): React.JSX.Element | null => {
  // PROPS
  const { columns, filteredColumns, serverSideFilters } = props;

  // HOOKS
  const isOnOverview = useCheckPath(PATHS.overview);

  // METHODS
  const compareArrays = (a: unknown[], b: unknown[]): boolean =>
    a.length === b.length && a.every((element, index) => element === b[index]);

  const isFilteredBy = (accessor: string, filterBy: unknown): boolean => {
    const column = columns.find((col) => col.id === accessor);
    if (!column) return false;

    const filteredValue = column.getFilterValue();
    if (!filteredValue) return false;
    else if (Array.isArray(filteredValue) && Array.isArray(filterBy)) {
      return compareArrays(filteredValue.sort(), filterBy.sort());
    } else {
      return filteredValue === filterBy;
    }
  };

  const handleFilterBy = (accessor: string, filterBy: unknown): void => {
    const isAlreadyFiltered = isFilteredBy(accessor, filterBy);
    const column = columns.find((col) => col.id === accessor);
    if (!column) return;

    if (isAlreadyFiltered) column.setFilterValue(undefined);
    else column.setFilterValue(filterBy);
  };

  const onChangeFilter = (
    option: SingleValue<SelectOption>,
    meta: ActionMeta<SelectOption>,
  ): void => {
    if (meta.action === 'clear') {
      const accessor = meta.removedValues[0].accessor;
      handleFilterBy(accessor, undefined);
    } else if (option) {
      handleFilterBy(option.accessor, option.filterBy);
    }
  };

  const getClientSideFilterButtons = (): FilterButton[] => {
    const buttons: FilterButton[] = [];

    filteredColumns.forEach(({ accessor, customFilters }) => {
      const column = columns.find((col) => col.id === accessor);
      if (!column) return;

      if (customFilters) {
        customFilters.forEach(({ label, values }) => {
          buttons.push({ accessor, label, filterBy: values });
        });
      } else {
        const uniqueValues = Array.from(column.getFacetedUniqueValues().keys());
        uniqueValues.forEach((value) => {
          buttons.push({ accessor, label: value, filterBy: value });
        });
      }
    });

    return buttons;
  };

  const getServerSideFilterButtons = (): FilterButton[] => {
    if (!serverSideFilters) return [];
    else return serverSideFilters;
  };

  // VARS
  const filterButtons = serverSideFilters
    ? getServerSideFilterButtons()
    : getClientSideFilterButtons();

  if (filterButtons.length === 1) return null;

  const selectOptions = filterButtons.map((filter) => ({ ...filter, value: filter.label }));
  const showSelect = filterButtons.length >= 5;
  const mobileClassName = classNames(
    'flex items-center space-x-2 mb-2 sm:mb-0',
    !showSelect && 'sm:hidden',
    isOnOverview && 'px-4 sm:px-0',
  );

  return (
    <>
      {/* DESKTOP */}
      <div className={`hidden space-x-2 ${showSelect ? 'hidden' : 'sm:block'}`}>
        <span className="text-sm text-gray-500">Filter:</span>
        {filterButtons.map(({ label, accessor, filterBy }) => (
          <Button
            key={label}
            color={isFilteredBy(accessor, filterBy) ? 'purple' : 'white'}
            size="xs"
            onClick={(): void => handleFilterBy(accessor, filterBy)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* MOBILE */}
      <div className={mobileClassName}>
        <span className="text-sm text-gray-500">Filter:</span>
        <Select
          className="z-20 w-full text-xs rounded-md react-select-remove-ring"
          onChange={onChangeFilter}
          options={selectOptions}
          placeholder="Choose filter"
          isClearable
        />
      </div>
    </>
  );
};

export default Filters;
