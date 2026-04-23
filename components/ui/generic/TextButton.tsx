import { ButtonColors } from '@/types/frontend';
import { classNames } from '@/utils/classNames';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

type Icon = 'eye' | 'edit' | 'trash';

type Props = {
  onClick?: () => void;
  color?: ButtonColors;
  text: string;
  icon?: Icon;
};

const TextButton = (props: Props): React.JSX.Element => {
  // PROPS
  const { onClick, color = 'white', text, icon } = props;

  // VARS
  const icons: Record<Icon, React.ReactNode> = {
    eye: <EyeIcon className="size-5" />,
    edit: <PencilSquareIcon className="size-5" />,
    trash: <TrashIcon className="size-5" />,
  };

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
    <button
      className={classNames(
        'flex flex-row items-center gap-2 py-2 font-semibold hover:cursor-pointer sm:px-4',
        colors[color],
      )}
      onClick={onClick}
    >
      {icon && icons[icon]}
      <span className="hidden lg:block">{text}</span>
    </button>
  );
};

export default TextButton;

export type { ButtonColors };
