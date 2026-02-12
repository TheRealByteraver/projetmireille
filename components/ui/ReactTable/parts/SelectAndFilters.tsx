import { ChangeEvent, useEffect, useState } from 'react';

import { Table } from '@tanstack/react-table';
import classNames from 'classnames';

import { DeleteOrdersButton } from 'components/shared';
import { Input, ScreenSizeRenderer } from 'components/ui';
import { SelectConditions, ServerSideFiltering } from 'types';
import { PATHS } from 'utils/constants';
import { useCheckPath, useDebounce } from 'utils/hooks';

import { FilterPopover, Selects, ServerSideFilters } from './index';

type Props<T> = {
  table: Table<T>;
  select?: {
    buttons: { text: string; conditions: SelectConditions }[];
  };
  serverSideFiltering?: ServerSideFiltering;
  accountID?: number;
};

const SelectAndFilters = <T,>(props: Props<T>): React.JSX.Element => {
  // PROPS
  const { select, table, serverSideFiltering, accountID } = props;

  // STATE
  const [globalFilter, setGlobalFilter] = useState('');

  // HOOKS
  const isOnOverview = useCheckPath(PATHS.overview);
  const debouncedGlobalFilter = useDebounce(globalFilter);

  // EFFECTS
  useEffect(() => {
    table.setGlobalFilter(debouncedGlobalFilter);
  }, [debouncedGlobalFilter, table]);

  // VARS
  const showFilters = serverSideFiltering && serverSideFiltering.headerFilters?.length;
  const showPopover = serverSideFiltering && serverSideFiltering.popoverFilters?.length;
  const showGlobalFiltering = serverSideFiltering && serverSideFiltering.globalFiltering;

  const selectedRows: T[] = [];
  table.getRowModel().rows.forEach((row) => {
    if (row.getIsSelected()) selectedRows.push(row.original);
  });
  const displayedRows = table.getRowModel().rows;

  return (
    <>
      {(select || showFilters || showPopover) && (
        <div
          className={classNames(
            'flex items-center justify-between gap-2 py-2',
            isOnOverview && 'px-4',
          )}
        >
          {showGlobalFiltering && (
            <div className="flex items-center flex-1">
              <Input
                type="search"
                label={serverSideFiltering.globalFiltering?.label}
                placeholder={serverSideFiltering.globalFiltering?.placeholder}
                className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setGlobalFilter(e.target.value)
                }
              />
            </div>
          )}

          <div className="flex items-center space-x-4">
            {select && (
              <Selects
                selectButtons={select.buttons}
                rows={displayedRows}
                selectedRows={selectedRows}
              />
            )}
            {serverSideFiltering && (
              <ScreenSizeRenderer minWidth="sm">
                <ServerSideFilters serverSideFiltering={serverSideFiltering} table={table} />
              </ScreenSizeRenderer>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {accountID && <DeleteOrdersButton accountID={accountID} />}
            {showPopover && (
              <FilterPopover
                columns={table.getAllColumns()}
                serverSideFiltering={serverSideFiltering}
              />
            )}
          </div>
        </div>
      )}
      <ScreenSizeRenderer maxWidth="sm">
        {showFilters && (
          <ServerSideFilters serverSideFiltering={serverSideFiltering} table={table} />
        )}
      </ScreenSizeRenderer>
    </>
  );
};

export default SelectAndFilters;
