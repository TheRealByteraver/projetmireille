import Select from 'react-select';

import { PerPageOption } from 'types';
import styles from '../../../ReactTable.module.css';

type Props = {
  perPage: number;
  changePerPage: (newPerPage: number) => void;
  perPageOptions?: PerPageOption[];
};

const PerPageSelect = ({ perPage, changePerPage, perPageOptions }: Props): React.JSX.Element => {
  // VARS
  const defaultPerPageOptions = [
    { label: 'show 25', value: 25 },
    { label: 'show 50', value: 50 },
    { label: 'show 75', value: 75 },
    { label: 'show 100', value: 100 },
  ];

  return (
    <Select
      value={{ label: `Show ${perPage}`, value: perPage }}
      onChange={(option): void => {
        if (option) changePerPage(option.value);
      }}
      className="text-xs rounded-md react-select-remove-ring sm:col-start-2 sm:mr-4"
      classNames={{
        control: () => styles.perPageSelectControl,
        valueContainer: () => styles.perPageSelectValueContainer,
        dropdownIndicator: () => styles.perPageSelectDropdownIndicator,
        menu: () => styles.perPageSelectMenu,
        singleValue: () => styles.perPageSelectSingleValue,
      }}
      menuPlacement="top"
      options={perPageOptions || defaultPerPageOptions}
    />
  );
};

export default PerPageSelect;
