import { classNames } from '@/utils/classNames';

type Props = {
  checked: boolean;
  onChange: () => void;
  label?: string;
};

const ToggleButton = (props: Props): React.JSX.Element => {
  const { checked, onChange, label } = props;

  return (
    <div className="flex items-center justify-start gap-3">
      <div
        onClick={onChange}
        className={classNames(
          'group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 inset-ring inset-ring-gray-900/5',
          'outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-focus-visible:outline-2',
          checked ? 'bg-indigo-600' : '',
        )}
      >
        <span
          className={classNames(
            'size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5',
            'transition-transform duration-200 ease-in-out',
            checked ? 'translate-x-5' : '',
          )}
        />
      </div>

      {label && (
        <div className="text-sm">
          <span className="font-semibold text-gray-900">{label}</span>
        </div>
      )}
    </div>
  );
};

export default ToggleButton;
