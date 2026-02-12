// markup from https://tailwindcss.com/plus/ui-blocks/application-ui/lists/tables, 'table with sticky headers'

import Button from '@/components/ui/Button';
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

  // METHODS
  const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

  // console.log(table.getRowModel());
  // console.log(table.getHeaderGroups());

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button color="green">Add user</Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => {
                  const { headers } = headerGroup;
                  return (
                    <tr key={headerGroup.id}>
                      {headers.map((header, index) => {
                        const isFirstHeader = index === 0;
                        const isLastHeader = index === headers.length - 1;
                        const commonHeaderClass =
                          'sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 ' +
                          'text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter ';
                        const specificHeaderClass = isFirstHeader
                          ? 'pr-3 pl-4 sm:pl-6 lg:pl-8 '
                          : isLastHeader
                            ? ''
                            : 'pr-4 pl-3 sm:pr-6 lg:pr-8';

                        return (
                          <th
                            key={header.id}
                            scope="col"
                            className={specificHeaderClass + commonHeaderClass}
                            // className2={
                            //   'sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 ' +
                            //   ' text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter ' +
                            //   'sm:table-cell'
                            // }
                            // className3={
                            //   'sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 ' +
                            //   'pr-4 pl-3 backdrop-blur-sm backdrop-filter sm:pr-6 lg:pr-8'
                            // }

                            // common:
                            // sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5
                            // text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter
                          >
                            {
                              <span className="inline-flex items-center w-full group">
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
                {table.getRowModel().rows.map((row, index) => {
                  const cells = row.getVisibleCells();
                  const isLastRow = index === table.getRowModel().rows.length - 1;
                  return (
                    <tr key={row.id} className="">
                      {cells.map((cell) => (
                        <td
                          key={cell.id}
                          onClick={(): void => row.toggleExpanded()}
                          style={{ height: '1px' }} // allows for full-height children
                          className={classNames(
                            isLastRow ? 'border-b border-gray-200' : '',
                            'py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8',
                          )}
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
