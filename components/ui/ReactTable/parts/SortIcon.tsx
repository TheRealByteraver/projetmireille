import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

type Props = {
  isSorted: boolean | 'asc' | 'desc';
  handleSort: () => void;
};

const SortIcon = ({ isSorted, handleSort }: Props): React.JSX.Element => {
  const isNotSorted = isSorted === false;
  const className = isNotSorted
    ? 'text-gray-300 hover:text-gray-700 hover:bg-gray-100'
    : 'text-gray-900 bg-gray-100 hover:bg-gray-200';

  return (
    <span className={`flex-none ml-2 rounded cursor-pointer ${className}`} onClick={handleSort}>
      {isNotSorted || isSorted === 'desc' ? (
        <ChevronDownIcon className="inline-block w-5 h-5" aria-hidden="true" />
      ) : (
        <ChevronUpIcon className="inline-block w-5 h-5" aria-hidden="true" />
      )}
    </span>
  );
};

export default SortIcon;
