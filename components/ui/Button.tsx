import { ButtonColors } from '@/types/frontend';
import { classNames } from '@/utils/classNames';

type Props = {
  onClick?: () => void;
  color?: ButtonColors;
  className?: string;
  children: React.ReactNode;
};

const Button = (props: Props): React.JSX.Element => {
  // PROPS
  const { onClick, color = 'white', className = '', children } = props;

  // VARS
  const colors: Record<ButtonColors, string> = {
    white: 'text-gray-700 border-gray-700 bg-gray-100 hover:bg-white focus-visible:outline-gray-700',
    green: 'text-white bg-green-600 border-green-600 hover:bg-green-500 focus-visible:outline-green-600',
    blue: 'text-white bg-blue-600 border-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600',
    indigo: 'text-white bg-indigo-600 border-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600',
    red: 'text-white bg-red-600 border-red-600 hover:bg-red-500 focus-visible:outline-red-600',
    yellow: 'text-white bg-yellow-600 border-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600',
  };

  return (
    <button
      className={classNames(
        'py-2 px-4 border rounded-md hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2',
        colors[color],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

export type { ButtonColors };
