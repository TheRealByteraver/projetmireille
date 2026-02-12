import { useEffect } from 'react';

import { Table } from '@tanstack/react-table';

// Renders all rows expanded
const useAllRowsExpanded = <T>(table: Table<T>, dataLength: number): void => {
  useEffect(() => {
    if (dataLength === 0) return;
    table.toggleAllRowsExpanded(true);
  }, [table, dataLength]);
};

export default useAllRowsExpanded;
