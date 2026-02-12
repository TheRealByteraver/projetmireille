import { ChevronRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import styles from '../../../ReactTable.module.css';

import { TablePagination } from 'types';

type Props = {
  pagination: TablePagination;
  prefetchFn?: () => void;
};

const NextButton = ({ pagination, prefetchFn }: Props): React.JSX.Element => {
  // METHODS
  const handlePrefetch = (hasNext?: boolean, currentPage?: number): void => {
    const canPrefetch = hasNext && currentPage && prefetchFn;

    if (canPrefetch) prefetchFn();
  };

  // VARS
  const currentPage = pagination.meta?.current_page;
  const pages = pagination.meta?.pages;
  const hasNext = pagination.meta?.has_next;
  const lastPage = pages?.[pages.length - 1];
  const isDisabled = !currentPage || !lastPage || currentPage >= lastPage;
  const buttonClassName = classNames(
    styles.paginationButton,
    'inline-flex items-center focus:z-20 rounded-md sm:rounded-none sm:rounded-r-md',
    'justify-self-end',
    !isDisabled && 'hover:bg-gray-50',
  );

  return (
    <button
      onClick={(): void => {
        if (currentPage) pagination.changePage(currentPage + 1);
      }}
      disabled={isDisabled}
      // ideally, the prefetch happens on hover, but in this case, it was not working
      // as you can click 10 times on the next button while not moving your mouse, and hence not trigger the hover event
      onMouseDown={(): void => handlePrefetch(hasNext, currentPage)}
      className={buttonClassName}
    >
      <span className="hidden sm:inline">Next</span>
      <ChevronRightIcon className="h-3 sm:hidden" />
    </button>
  );
};

export default NextButton;
