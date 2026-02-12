import { createColumnHelper } from '@tanstack/react-table';

// Define your row shape
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.display({
    id: 'actions',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: (props) => props.column.id,
  }),
];
// const columns = [
//   // Display Column
//   columnHelper.display({
//     id: 'actions',
//     // cell: (props) => <RowActions row={props.row} />,
//     cell: (info) => info.getValue(),
//   }),
//   // Grouping Column
//   columnHelper.group({
//     header: 'Name',
//     footer: (props) => props.column.id,
//     columns: [
//       // Accessor Column
//       columnHelper.accessor('firstName', {
//         cell: (info) => info.getValue(),
//         footer: (props) => props.column.id,
//       }),
//       // Accessor Column
//       columnHelper.accessor((row) => row.lastName, {
//         id: 'lastName',
//         cell: (info) => info.getValue(),
//         header: () => <span>Last Name</span>,
//         footer: (props) => props.column.id,
//       }),
//     ],
//   }),
//   // Grouping Column
//   columnHelper.group({
//     header: 'Info',
//     footer: (props) => props.column.id,
//     columns: [
//       // Accessor Column
//       columnHelper.accessor('age', {
//         header: () => 'Age',
//         footer: (props) => props.column.id,
//       }),
//       // Grouping Column
//       columnHelper.group({
//         header: 'More Info',
//         columns: [
//           // Accessor Column
//           columnHelper.accessor('visits', {
//             header: () => <span>Visits</span>,
//             footer: (props) => props.column.id,
//           }),
//           // Accessor Column
//           columnHelper.accessor('status', {
//             header: 'Status',
//             footer: (props) => props.column.id,
//           }),
//           // Accessor Column
//           columnHelper.accessor('progress', {
//             header: 'Profile Progress',
//             footer: (props) => props.column.id,
//           }),
//         ],
//       }),
//     ],
//   }),
// ];

export default columns;
