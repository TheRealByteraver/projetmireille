import TextButton from '@/components/ui/TextButton';
import { ApiExerciseList } from '@/types/apiTypes';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<ApiExerciseList>();

const getColumns = (presentExerciseList: (exerciseListId: number) => void): ColumnDef<ApiExerciseList>[] =>
  [
    columnHelper.accessor('id', {
      cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('name', {
      header: () => 'Nom',
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'exerciseCount',
      header: () => "Nombre d'exercices",
      cell: (info) => info.row.original.exercises.length,
    }),

    columnHelper.display({
      id: 'Level',
      header: () => 'Niveaux',
      cell: (info) => {
        const levels: string[] = info.row.original.exercises.reduce(
          (prev, next) => (prev.includes(next.exerciseData.level) ? prev : [...prev, next.exerciseData.level]),
          [] as string[],
        );
        return <span>{levels.join(', ')}</span>;
      },
    }),
    columnHelper.display({
      id: 'present',
      header: () => '',
      cell: (info) => (
        <TextButton color="green" text="Présenter" onClick={() => presentExerciseList(info.row.original.id)} />
      ),
    }),
    // columnHelper.display({
    //   id: 'edit',
    //   header: () => '',
    //   cell: () => <TextButton color="yellow" text="Modifier" />,
    // }),
    // columnHelper.display({
    //   id: 'delete',
    //   header: () => '',
    //   cell: () => <TextButton color="red" text="Supprimer" />,
    // }),
  ] as const as ColumnDef<ApiExerciseList>[];

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

export default getColumns;
