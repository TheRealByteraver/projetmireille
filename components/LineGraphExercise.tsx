import PentagonIcon from './ui/PentagonIcon';
import { Exercise } from '@/types/frontend';

const twColors = {
  blue: { textColor: 'text-sky-500', borderColor: 'border-sky-500' },
  green: { textColor: 'text-green-500', borderColor: 'border-green-500' },
};

type LineGraphExerciseColor = 'blue' | 'green';

type Props = {
  exercise: Exercise;
  color: LineGraphExerciseColor;
  isSolutionVisible: boolean;
  showSolution: () => void;
};

const LineGraphExercise = (props: Props): React.JSX.Element => {
  // PROPS
  const { exercise, color, isSolutionVisible, showSolution } = props;
  const { startNumber, questionPosition, nrOfSteps, step } = exercise;

  // VARS
  const endNumber = startNumber + (nrOfSteps + 1) * step;
  const solution = startNumber + questionPosition * step;

  return (
    <div className="flex flex-col flex-1 pt-10 pb-6 overflow-hidden">
      <ul className="flex flex-row px-6 h-5">
        <li className={`border-l-3 border-r-[1.5px] border-b-3 ${twColors[color].borderColor} flex-1 relative`}>
          <div
            className={'mt-3 absolute -left-[1.5px] -translate-x-1/2 translate-y-1/2 flex justify-center items-center'}
          >
            {startNumber}
          </div>
        </li>
        {Array.from({ length: nrOfSteps - 1 }, (_, i) => (
          <li key={i} className={`border-x-[1.5px] border-b-3 ${twColors[color].borderColor} flex-1 relative`}>
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
        <li className={`border-l-[1.5px] border-r-3 border-b-3 ${twColors[color].borderColor} flex-1 relative`}>
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
                'mt-3 absolute left-[1.5px] translate-x-1/2 translate-y-1/2 w-full flex justify-center items-center'
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
      className="absolute w-12 h-12 -left-[1.5px] -translate-x-1/2 bottom-2.5 hover:cursor-pointer"
      onClick={handleClick}
    >
      <PentagonIcon color={color} />
    </div>
    {isSolutionVisible && (
      <div
        className={
          'absolute -left-[1.5px] -translate-x-1/2 translate-y-1/2 ' +
          'mt-3 w-full flex justify-center items-center font-semibold ' +
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
