import { classNames } from '@/utils/classNames';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getGroupedRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Props<T> = {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
};

const ReactTable = <T,>(props: Props<T>): React.JSX.Element => {
  // PROPS
  const { data, columns } = props;

  // RT
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableRowSelection: true,
    manualPagination: true,
  });

  // VARS
  const evenRows = table.getRowModel().rows.length % 2 === 0;

  return (
    <div
      className={classNames(
        'overflow-y-hidden rounded-md border border-gray-300 px-4 pb-1 sm:px-6 lg:px-8',
        evenRows ? 'bg-gray-50' : '',
      )}
    >
      <div className="flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0 bg-white pt-8">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => {
                  const { headers } = headerGroup;
                  return (
                    <tr key={headerGroup.id}>
                      {headers.map((header, index) => {
                        const isFirstHeader = index === 0;
                        const isLastHeader = index === headers.length - 1;
                        const commonHeaderClass =
                          'uppercase sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5';
                        const textClass =
                          'text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter';
                        const specificHeaderClass = isFirstHeader
                          ? 'pr-3 pl-4 ' + textClass
                          : isLastHeader
                            ? 'pr-4 pl-3 backdrop-blur-sm backdrop-filter sm:pr-6 lg:pr-8 text-sm '
                            : 'px-3 ' + textClass;

                        return (
                          <th
                            key={header.id}
                            scope="col"
                            className={classNames(specificHeaderClass, commonHeaderClass)}
                          >
                            {
                              <span className="group inline-flex w-full items-center">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </span>
                            }
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  const cells = row.getVisibleCells();
                  return (
                    <tr key={row.id} className="bg-white even:bg-gray-50">
                      {cells.map((cell) => (
                        <td
                          key={cell.id}
                          onClick={(): void => row.toggleExpanded()}
                          style={{ height: '1px' }} // allows for full-height children
                          className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pr-8"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactTable;
