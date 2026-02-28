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
      'text-gray-700 border-gray-300 bg-gray-100 hover:bg-white focus-visible:outline-gray-300',
      'disabled:bg-gray-300/50 disabled:text-gray-700/50',
    ),
    green: 'text-white bg-green-600 hover:bg-green-500 focus-visible:outline-green-600 disabled:bg-green-600/50',
    blue: 'text-white bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600 disabled:bg-blue-600/50',
    indigo: 'text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:bg-indigo-600/50',
    red: 'text-white bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 disabled:bg-red-600/50',
    yellow: 'text-white bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600 disabled:bg-yellow-600/50',
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
