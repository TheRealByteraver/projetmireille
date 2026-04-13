import { classNames } from '@/utils/classNames';
import { RadioOption } from '@/types/frontend';

type Props = {
  name: string;
  value: string;
  setValue: (value: string) => void;
  options: RadioOption[];
};

const SmallCardsRadioGroup = (props: Props): React.JSX.Element => {
  // PROPS
  const { name, value, setValue, options } = props;

  return (
    <fieldset aria-label="Radio group">
      <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {options.map((option) => (
          <label
            key={option.value}
            aria-label={option.label}
            className={classNames(
              'group relative flex items-center justify-center',
              'rounded-md border border-gray-300 bg-white p-3',
              'has-checked:border-indigo-600 has-checked:bg-indigo-600',
              'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600',
              'has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25',
            )}
          >
            <input
              className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              disabled={!option.enabled}
              onChange={(e) => setValue(e.target.value)}
            />
            <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white dark:text-white">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default SmallCardsRadioGroup;
