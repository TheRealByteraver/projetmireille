import { ButtonColors } from '@/types/frontend';
import { classNames } from '@/utils/classNames';

type Props = {
  onClick?: () => void;
  color?: ButtonColors;
  text: string;
};

const TextButton = (props: Props): React.JSX.Element => {
  // PROPS
  const { onClick, color = 'white', text } = props;

  // VARS
  const colors: Record<ButtonColors, string> = {
    white: 'text-gray-700 hover:text-gray-500',
    green: 'text-green-600 hover:text-green-400',
    blue: 'text-blue-600 hover:text-blue-400',
    indigo: 'text-indigo-600 hover:text-indigo-400',
    red: 'text-red-600 hover:text-red-400',
    yellow: 'text-yellow-500 hover:text-yellow-300',
  };

  return (
    <button className={classNames('py-2 px-4 font-semibold hover:cursor-pointer', colors[color])} onClick={onClick}>
      {text}
    </button>
  );
};

export default TextButton;

export type { ButtonColors };
