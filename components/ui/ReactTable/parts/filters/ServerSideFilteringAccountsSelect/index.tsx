import { ActionMeta, SingleValue } from 'react-select';

import { OptionType } from 'types';
import { useGetRouterClientNameAndID } from 'utils/hooks';

import AllAccountsSelect from './AllAccountsSelect';
import ClientAccountsSelect from './ClientAccountsSelect';

type Props = {
  accessor: string;
  onChangeFilter: (
    accessor: string,
    option: SingleValue<OptionType>,
    meta: ActionMeta<OptionType>,
  ) => void;
};

const ServerSideFilteringAccountsSelect = ({
  onChangeFilter,
  accessor,
}: Props): React.JSX.Element => {
  // RQ
  const { clientID } = useGetRouterClientNameAndID();

  if (clientID) {
    return (
      <ClientAccountsSelect
        onChangeFilter={onChangeFilter}
        accessor={accessor}
        clientID={clientID}
      />
    );
  } else {
    return <AllAccountsSelect onChangeFilter={onChangeFilter} accessor={accessor} />;
  }
};

export default ServerSideFilteringAccountsSelect;
