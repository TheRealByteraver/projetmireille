import { useEffect } from 'react';

import { Table } from '@tanstack/react-table';

// apply the default grouping state
const useGroupingState = <T>(table: Table<T>, groupingState?: string[]): void => {
  useEffect(() => {
    if (groupingState) table.setGrouping(groupingState);
  }, [table, groupingState]);
};

export default useGroupingState;
