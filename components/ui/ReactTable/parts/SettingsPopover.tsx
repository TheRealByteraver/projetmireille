import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

import { Button, PopoverButton, Checkbox } from 'components/ui';
import { SettingsPopoverType } from 'types';

type Props = {
  settingsPopover: SettingsPopoverType;
};

const SettingsPopover = ({ settingsPopover }: Props): React.JSX.Element => {
  // VARS
  const triggerButton = (
    <Button color="white" className="flex items-center">
      <span className="hidden mr-2 sm:inline">{settingsPopover.label}</span>
      <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-700" />
    </Button>
  );

  return (
    <PopoverButton reactEl={triggerButton} className="w-60 max-w-xs sm:right-0">
      {settingsPopover.items.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox onClick={item.onClick} isChecked={item.isChecked} />
          <span>{item.label}</span>
        </div>
      ))}
    </PopoverButton>
  );
};

export default SettingsPopover;
