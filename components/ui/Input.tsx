import { classNames } from '@/utils/classNames';
import { HTMLProps } from 'react';

type Props = HTMLProps<HTMLInputElement> & {
  // type any custom props you want to pass other than-
  // existing props for a input like "placeholder", "name" or "type"
  error?: string | boolean;
};

const Input = (props: Props): React.JSX.Element => {
  // PROPS
  const {
    ref,
    label,
    type,
    min,
    max,
    name,
    placeholder,
    disabled,
    error,
    value,
    required,
    step,
    autoFocus = false,
    ...restProps
  } = props;

  // VARS
  const labelClassName = classNames(
    'text-sm font-semibold absolute -top-2.5 left-2 bg-white px-1',
    error ? 'text-red-500' : 'text-gray-600',
  );

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className={labelClassName}>
          <span className="flex items-center overflow-auto text-nowrap">{error ? error : label}</span>
        </label>
      )}
      <input
        className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-0"
        {...restProps}
        min={min}
        max={max}
        type={type}
        name={name}
        id={name}
        required={required}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        step={step}
        autoFocus={autoFocus}
      />
    </div>
  );
};
export default Input;
