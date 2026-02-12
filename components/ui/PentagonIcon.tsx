type PentagonIconColor = 'blue' | 'green';

const FILL_MAP: Record<PentagonIconColor, string> = {
  blue: '#e0f2fe',
  green: '#dcfce7',
};

const STROKE_MAP: Record<PentagonIconColor, string> = {
  blue: '#0ea5e9',
  green: '#22c55e',
};

type Props = {
  color: PentagonIconColor;
};

const PentagonIcon = (props: Props): React.JSX.Element => {
  // PROPS
  const { color } = props;

  // VARS
  const fillColor = FILL_MAP[color];
  const strokeColor = STROKE_MAP[color];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
      <polygon points="50,12 93,38 76,88 24,88 7,38" fill={fillColor} stroke={strokeColor} strokeWidth={5} />
      <text
        x="50"
        y="72"
        textAnchor="middle"
        fill="black"
        fontSize="50"
        fontWeight="normal"
        fontFamily="system-ui, sans-serif"
      >
        ?
      </text>
    </svg>
  );
};

export default PentagonIcon;
