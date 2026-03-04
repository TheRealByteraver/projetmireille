import { ButtonColors } from '@/types/frontend';
import { classNames } from '@/utils/classNames';

type Props = {
  onClick?: () => void;
  color?: ButtonColors;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const Button = (props: Props): React.JSX.Element => {
  // PROPS
  const { onClick, color = 'white', className = '', children, type = 'button', disabled = false } = props;

  // VARS
  const colors: Record<ButtonColors, string> = {
    white: classNames(
      'text-gray-700 bg-gray-100 border-gray-100',
      disabled ? '' : 'hover:border-gray-300 hover:bg-white',
      'focus-visible:outline-gray-300 disabled:opacity-50',
    ),
    green: classNames(
      'text-white bg-green-600 border-green-600',
      disabled ? '' : 'hover:border-green-500 hover:bg-green-500',
      'focus-visible:outline-green-600 disabled:opacity-50',
    ),
    blue: classNames(
      'text-white bg-blue-600 border-blue-600',
      disabled ? '' : 'hover:border-blue-500 hover:bg-blue-500',
      'focus-visible:outline-blue-600 disabled:opacity-50',
    ),
    indigo: classNames(
      'text-white bg-indigo-600 border-indigo-600',
      disabled ? '' : 'hover:border-indigo-500 hover:bg-indigo-500',
      'focus-visible:outline-indigo-600 disabled:opacity-50',
    ),
    red: classNames(
      'text-white bg-red-600 border-red-600',
      disabled ? '' : 'hover:border-red-500 hover:bg-red-500',
      'focus-visible:outline-red-600 disabled:opacity-50',
    ),
    yellow: classNames(
      'text-white bg-yellow-600 border-yellow-600',
      disabled ? '' : 'hover:border-yellow-500 hover:bg-yellow-500',
      'focus-visible:outline-yellow-600 disabled:opacity-50',
    ),
  };

  return (
    <button
      className={classNames(
        'rounded-md border px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2',
        disabled ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer',
        colors[color],
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

export type { ButtonColors };
