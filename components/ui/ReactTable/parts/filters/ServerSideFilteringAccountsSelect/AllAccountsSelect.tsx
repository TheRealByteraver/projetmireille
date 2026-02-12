import { ActionMeta, SingleValue } from 'react-select';

import { AccountSelect } from 'components/collections';
import { useAllAccounts } from 'services/kl';
import { OptionType } from 'types';

type Props = {
  accessor: string;
  onChangeFilter: (
    accessor: string,
    option: SingleValue<OptionType>,
    meta: ActionMeta<OptionType>,
  ) => void;
};

const AllAccountsSelect = ({ onChangeFilter, accessor }: Props): React.JSX.Element => {
  // RQ
  const { data: accounts = [] } = useAllAccounts();

  return (
    <AccountSelect
      onChange={(option, meta): void => onChangeFilter(accessor, option, meta)}
      accounts={accounts}
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 20 }) }}
      isClearable
    />
  );
};

export default AllAccountsSelect;
