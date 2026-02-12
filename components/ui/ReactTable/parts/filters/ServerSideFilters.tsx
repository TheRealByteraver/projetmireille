import { Fragment } from 'react';

import { Table } from '@tanstack/react-table';
import classNames from 'classnames';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';

import { ServerSideFiltering, OptionType } from 'types';
import { PATHS } from 'utils/constants';
import { useCheckPath } from 'utils/hooks';

import ServerSideFilteringAccountsSelect from './ServerSideFilteringAccountsSelect';

type Props<T> = {
  serverSideFiltering: ServerSideFiltering;
  table: Table<T>;
};

const ServerSideFilters = <T,>({ serverSideFiltering, table }: Props<T>): React.JSX.Element => {
  // HOOKS
  const isOnOverview = useCheckPath(PATHS.overview);
  // METHODS
  const columns = table.getAllColumns();

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
    accessor: string,
    option: SingleValue<OptionType> | MultiValue<OptionType>,
    meta?: ActionMeta<OptionType>,
  ): void => {
    if (meta?.action === 'clear') {
      handleFilterBy(accessor, undefined);
      return;
    }

    if (!option) return;

    if (Array.isArray(option)) {
      // Multi-select case
      handleFilterBy(
        accessor,
        option.map((o) => o.value.toString()),
      );
    } else {
      // Single-select case
      handleFilterBy(accessor, (option as OptionType).value.toString());
    }
  };

  // VARS
  const mobileClassName = classNames(
    'flex flex-col w-full gap-2 mb-2 sm:hidden',
    isOnOverview && 'px-4 sm:px-0',
  );

  return (
    <>
      {/* DESKTOP */}
      <div className="items-center hidden my-2 space-x-4 sm:flex">
        {serverSideFiltering?.headerFilters?.map(
          ({ label, accessor, options, selectPlaceholder, isMulti }) => {
            const selectOptions = options.map((option) => ({ label: option, value: option }));
            const column = columns.find((col) => col.id === accessor);
            const filterValue = column?.getFilterValue();

            return (
              <Fragment key={label}>
                <div className="flex space-x-2">
                  {accessor === 'account_id' ? (
                    <div className="w-full sm:min-w-[450px]">
                      <ServerSideFilteringAccountsSelect
                        onChangeFilter={onChangeFilter}
                        accessor={accessor}
                      />
                    </div>
                  ) : (
                    <Select
                      className="w-full sm:min-w-[250px] text-xs rounded-md react-select-remove-ring z-[11]"
                      onChange={(option, meta): void => onChangeFilter(accessor, option, meta)}
                      options={selectOptions}
                      value={
                        isMulti
                          ? selectOptions.filter(
                              (o) => Array.isArray(filterValue) && filterValue.includes(o.value),
                            )
                          : selectOptions.find((o) => filterValue === o.value) || null
                      }
                      placeholder={`${selectPlaceholder || 'Choose filter'}`}
                      isClearable
                      isMulti={isMulti}
                    />
                  )}
                </div>
              </Fragment>
            );
          },
        )}
      </div>

      {/* MOBILE */}
      <div className={mobileClassName}>
        {serverSideFiltering.headerFilters?.map(
          ({ accessor, options, selectPlaceholder, isMulti }) => {
            const selectOptions = options.map((option) => ({ label: option, value: option }));
            const column = columns.find((col) => col.id === accessor);
            const filterValue = column?.getFilterValue();

            return (
              <Fragment key={accessor}>
                <div className="flex space-x-2">
                  {accessor === 'account_id' ? (
                    <div className="w-full sm:min-w-[450px]">
                      <ServerSideFilteringAccountsSelect
                        onChangeFilter={onChangeFilter}
                        accessor={accessor}
                      />
                    </div>
                  ) : (
                    <Select
                      className="w-full sm:min-w-[250px] text-xs rounded-md react-select-remove-ring"
                      onChange={(option, meta): void => onChangeFilter(accessor, option, meta)}
                      options={options.map((option) => ({ label: option, value: option }))}
                      value={
                        isMulti
                          ? selectOptions.filter(
                              (o) => Array.isArray(filterValue) && filterValue.includes(o.value),
                            )
                          : selectOptions.find((o) => filterValue === o.value) || null
                      }
                      placeholder={`${selectPlaceholder || 'Choose filter'}`}
                      menuPortalTarget={document.body}
                      styles={{ menuPortal: (base) => ({ ...base, zIndex: 41 }) }}
                      isClearable
                      isMulti={isMulti}
                    />
                  )}
                </div>
              </Fragment>
            );
          },
        )}
      </div>
    </>
  );
};

export default ServerSideFilters;
