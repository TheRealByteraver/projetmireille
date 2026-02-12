import { Pagination } from 'types';

type Props = {
  meta: Pagination;
  displayedRowsCount: number;
};

const PaginationInfo = ({ meta, displayedRowsCount }: Props): React.JSX.Element => {
  // VARS
  const { total_items, current_page, per_page } = meta;

  const showingFrom = per_page * (current_page - 1) + 1;
  const showingTo = showingFrom + displayedRowsCount - 1;

  return (
    <p className="text-xs">
      <span className="font-medium">{showingFrom}</span> to{' '}
      <span className="font-medium">{showingTo}</span> of{' '}
      <span className="font-medium">{total_items}</span>
    </p>
  );
};

export default PaginationInfo;
