import classNames from 'classnames';

import { RefetchInfo } from 'components/ui';
import { RefetchInfo as RefetchInfoType, SettingsPopoverType, TableHeading } from 'types';
import { PATHS } from 'utils/constants';
import { useCheckPath } from 'utils/hooks';

import SettingsPopover from './SettingsPopover';

type Props = {
  totalRowsLength: number;
  heading: TableHeading;
  refetchInfo?: RefetchInfoType;
  settingsPopover?: SettingsPopoverType;
};

const Heading = (props: Props): React.JSX.Element => {
  // PROPS
  const { totalRowsLength, heading, refetchInfo, settingsPopover } = props;

  // HOOK
  const isOnOrders = useCheckPath(PATHS.orders);
  const isOnDashboard = useCheckPath(PATHS.traderDashboard);

  // VARS
  const { headingAction, typeName, tableTitle } = heading;

  return (
    <div
      className={classNames(
        'py-3.5 bg-white border-b border-gray-200',
        isOnOrders ? 'border-t' : 'px-4',
        isOnDashboard && 'rounded',
      )}
    >
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="flex items-center justify-between flex-1">
          {tableTitle}
          {typeName && (
            <p className="text-sm py-1.5 text-gray-500">
              {typeName}: {totalRowsLength}
            </p>
          )}
          <div className="flex items-center space-x-4">
            {refetchInfo && <RefetchInfo {...refetchInfo} />}
            {settingsPopover && <SettingsPopover settingsPopover={settingsPopover} />}
          </div>
        </div>

        {headingAction}
      </div>
    </div>
  );
};

export default Heading;
