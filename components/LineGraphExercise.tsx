import PentagonIcon from './ui/PentagonIcon';
import { LineGraphExercise as LineGraphExerciseType } from '@/types/frontend';

const twColors = {
  blue: { textColor: 'text-sky-500', borderColor: 'border-sky-500' },
  green: { textColor: 'text-green-500', borderColor: 'border-green-500' },
};

type LineGraphExerciseColor = 'blue' | 'green';

type Props = {
  exercise: LineGraphExerciseType;
  color: LineGraphExerciseColor;
  isSolutionVisible: boolean;
  showSolution?: () => void;
};

const LineGraphExercise = (props: Props): React.JSX.Element => {
  // PROPS
  const { exercise, color, isSolutionVisible, showSolution = () => {} } = props;
  const { startNumber, questionPosition, nrOfSteps, step } = exercise;

  // VARS
  const endNumber = startNumber + (nrOfSteps + 1) * step;
  const solution = startNumber + questionPosition * step;

  return (
    <div className="flex flex-1 flex-col overflow-hidden pt-10 pb-6">
      <ul className="flex h-5 flex-row px-6">
        <li className={`border-r-2 border-b-4 border-l-4 ${twColors[color].borderColor} relative flex-1`}>
          <div className={'absolute -left-0.5 mt-3 flex -translate-x-1/2 translate-y-1/2 items-center justify-center'}>
            {startNumber}
          </div>
        </li>
        {Array.from({ length: nrOfSteps - 1 }, (_, i) => (
          <li key={i} className={`border-x-2 border-b-4 ${twColors[color].borderColor} relative flex-1`}>
            {i + 1 === questionPosition && (
              <Icon
                isSolutionVisible={isSolutionVisible}
                solution={solution}
                handleClick={showSolution}
                color={color}
              />
            )}
          </li>
        ))}
        <li className={`border-r-4 border-b-4 border-l-2 ${twColors[color].borderColor} relative flex-1`}>
          <>
            {questionPosition === nrOfSteps && (
              <Icon
                isSolutionVisible={isSolutionVisible}
                solution={solution}
                handleClick={showSolution}
                color={color}
              />
            )}
            <div
              className={
                'absolute left-0.5 mt-3 flex w-full translate-x-1/2 translate-y-1/2 items-center justify-center'
              }
            >
              {endNumber}
            </div>
          </>
        </li>
      </ul>
    </div>
  );
};

type IconProps = {
  isSolutionVisible: boolean;
  solution: number;
  handleClick: () => void;
  color: LineGraphExerciseColor;
};

const Icon = ({ isSolutionVisible, solution, handleClick, color }: IconProps): React.JSX.Element => (
  <>
    <div
      className="absolute bottom-2.5 -left-0.5 h-12 w-12 -translate-x-1/2 hover:cursor-pointer"
      onClick={handleClick}
    >
      <PentagonIcon color={color} />
    </div>
    {isSolutionVisible && (
      <div
        className={
          'absolute -left-0.5 -translate-x-1/2 translate-y-1/2 ' +
          'mt-3 flex w-full items-center justify-center font-semibold ' +
          twColors[color].textColor
        }
      >
        {solution}
      </div>
    )}
  </>
);

export default LineGraphExercise;

export type { LineGraphExerciseColor };
