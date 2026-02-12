import classNames from 'classnames';

import { TablePagination } from 'types';
import { PATHS } from 'utils/constants';
import { useCheckPath } from 'utils/hooks';

import { PerPageSelect, PaginationInfo, PreviousButton, NextButton } from './parts';
import styles from '../../ReactTable.module.css';

type Props = {
  pagination: TablePagination;
  displayedRowsCount: number;
  prefetchFn?: () => void;
};

const Pagination = ({ pagination, displayedRowsCount, prefetchFn }: Props): React.JSX.Element => {
  // HOOKS
  const isOnOverview = useCheckPath(PATHS.overview);

  // VARS
  const { perPage, changePerPage } = pagination;

  const paginationWrapperStyle = classNames(
    styles.paginationWrapper,
    'flex items-center justify-between',
    'grid grid-flow-col sm:grid-cols-[1fr_auto_auto]',
    !isOnOverview && 'rounded-b-lg -m-[1px]',
  );

  return (
    <div className={classNames(!isOnOverview && 'p-[2px] pt-0')}>
      <div className={paginationWrapperStyle}>
        <PreviousButton pagination={pagination} />
        {pagination.meta && (
          <PaginationInfo meta={pagination.meta} displayedRowsCount={displayedRowsCount} />
        )}
        <PerPageSelect
          perPage={perPage}
          changePerPage={changePerPage}
          perPageOptions={pagination.perPageOptions}
        />
        <NextButton pagination={pagination} prefetchFn={prefetchFn} />
      </div>
    </div>
  );
};

export default Pagination;
