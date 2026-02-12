import { ActionMeta, SingleValue } from 'react-select';

import { AccountSelect } from 'components/collections';
import { useAccounts } from 'services/kl';
import { OptionType } from 'types';

type Props = {
  accessor: string;
  clientID: number;
  onChangeFilter: (
    accessor: string,
    option: SingleValue<OptionType>,
    meta: ActionMeta<OptionType>,
  ) => void;
};

const ClientAccountsSelect = ({ onChangeFilter, accessor, clientID }: Props): React.JSX.Element => {
  // RQ
  const { data: accounts = [] } = useAccounts(clientID);

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

export default ClientAccountsSelect;
