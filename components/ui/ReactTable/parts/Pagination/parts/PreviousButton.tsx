import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

import { TablePagination } from 'types';
import styles from '../../../ReactTable.module.css';

type Props = {
  pagination: TablePagination;
};

const PreviousButton = ({ pagination }: Props): React.JSX.Element => {
  // METHODS
  const handlePreviousPage = (currentPage?: number): void => {
    if (currentPage) pagination.changePage(currentPage - 1);
  };

  // VARS
  const currentPage = pagination.meta?.current_page;
  const isDisabled = !currentPage || currentPage === 1;
  const buttonClassName = classNames(
    styles.paginationButton,
    'inline-flex items-center focus:z-20 rounded-md sm:rounded-none sm:rounded-l-md',
    'justify-self-start sm:col-start-3 sm:justify-self-end',
    !isDisabled && 'hover:bg-gray-50',
  );

  return (
    <button
      onClick={(): void => handlePreviousPage(currentPage)}
      disabled={isDisabled}
      className={buttonClassName}
    >
      <span className="hidden sm:inline">Previous</span>
      <ChevronLeftIcon className="h-3 sm:hidden" />
    </button>
  );
};

export default PreviousButton;
