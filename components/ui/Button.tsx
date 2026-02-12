type ButtonColors = 'white' | 'green' | 'blue';

type Props = {
  onClick?: () => void;
  color?: ButtonColors;
  children: React.ReactNode;
};

const Button = (props: Props): React.JSX.Element => {
  // PROPS
  const { onClick, color = 'white', children } = props;

  // VARS
  const colors: Record<ButtonColors, string> = {
    white: 'text-gray-700 border-gray-700 bg-gray-100 hover:bg-white focus-visible:outline-gray-700',
    green: 'text-white bg-green-600 border-green-600 hover:bg-green-500 focus-visible:outline-green-600',
    blue: 'text-white bg-blue-600 border-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600',
  };

  return (
    <button
      className={
        'py-2 px-4 border rounded-md hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ' +
        colors[color]
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

export type { ButtonColors };
