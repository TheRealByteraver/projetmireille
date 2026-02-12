import { useState } from 'react';

import { ColumnFiltersState, Updater } from '@tanstack/react-table';

import { ServerSideFiltering, TablePagination } from 'types';

type UseTableFilteringReturn = {
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  handleColumnFiltering: (filterFn: Updater<ColumnFiltersState>) => void;
  handleGlobalFiltering: (value: string) => void;
};

type UseTableFilteringParams = {
  defaultFilters?: ColumnFiltersState;
  serverSideFiltering?: ServerSideFiltering;
  pagination?: TablePagination;
  accountID?: number;
};

const useTableFiltering = (params: UseTableFilteringParams): UseTableFilteringReturn => {
  // PARAMS
  const { defaultFilters, serverSideFiltering, pagination } = params;
  const { globalFiltering, handleSetFilters } = serverSideFiltering || {};
  const { queryParam } = globalFiltering || {};

  // STATE
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(defaultFilters || []);
  const [globalFilter, setGlobalFilter] = useState('');

  // METHODS
  const updateServerFilters = (filters: ColumnFiltersState, searchValue: string): void => {
    if (!handleSetFilters) return;

    const allFilters = [...filters];
    if (queryParam && searchValue) {
      allFilters.push({ id: queryParam, value: searchValue });
    }

    handleSetFilters(allFilters);
  };

  const handleColumnFiltering = (filterFn: Updater<ColumnFiltersState>): void => {
    const newFilters = typeof filterFn === 'function' ? filterFn(columnFilters) : filterFn;
    setColumnFilters(newFilters);
    pagination?.changePage(1);

    if (serverSideFiltering) {
      updateServerFilters(newFilters, globalFilter);
    }
  };

  const handleGlobalFiltering = (value: string): void => {
    setGlobalFilter(value);
    pagination?.changePage(1);

    if (serverSideFiltering) {
      updateServerFilters(columnFilters, value);
    }
  };

  return {
    columnFilters,
    globalFilter,
    handleColumnFiltering,
    handleGlobalFiltering,
  };
};

export default useTableFiltering;
