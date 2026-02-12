import { useState } from 'react';

import { SortingState, Updater } from '@tanstack/react-table';

import { ServerSideSorting } from 'types';

type ReturnUseSorting = [
  sorting: SortingState,
  handleSorting: (filterFn: Updater<SortingState>) => void,
];

type Params = {
  defaultSort?: SortingState;
  serverSideSorting?: ServerSideSorting;
};

const useSorting = (params: Params): ReturnUseSorting => {
  // PARAMS
  const { defaultSort, serverSideSorting } = params;

  // STATE
  const [sorting, setSorting] = useState<SortingState>(defaultSort || []);

  // METHODS
  const handleSorting = (sortingFn: Updater<SortingState>): void => {
    setSorting(sortingFn);
    if (!serverSideSorting || typeof sortingFn !== 'function') return;

    const sortingArg = sortingFn(sorting);

    if (serverSideSorting?.handleSetSorting) {
      serverSideSorting.handleSetSorting(sortingArg);
    }
  };

  return [sorting, handleSorting];
};

export default useSorting;
