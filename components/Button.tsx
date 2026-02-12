export type ButtonColors = 'white' | 'green';

type Props = {
  onClick: () => void;
  text: string;
  color?: ButtonColors;
};

const Button = (props: Props): React.JSX.Element => {
  // PROPS
  const { onClick, text, color = 'white' } = props;

  // VARS
  const colors: Record<ButtonColors, string> = {
    white: 'text-gray-700 border-gray-700 bg-white',
    green: 'text-white bg-green-600 border-green-600',
  };

  return (
    <button className={`${colors[color]} py-1 px-2 border rounded-md hover:cursor-pointer`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
