'use client';

import { useState } from 'react';
import PentagonIcon from './PentagonIcon';
import { Exercise } from '@/types/frontend';

type Props = {
  exercise: Exercise;
  color: 'green' | 'blue';
};

const LineGraphExercise = (props: Props): React.JSX.Element => {
  // PROPS
  const { exercise, color } = props;
  const { startNumber, questionPosition, nrOfSteps, step } = exercise;

  // STATE
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);

  // METHODS
  const handleClick = () => setIsSolutionVisible(true);

  // VARS
  const endNumber = startNumber + (nrOfSteps + 1) * step;
  const solution = startNumber + questionPosition * step;
  const twColors = {
    blue: { borderColor: 'border-sky-500' },
    green: { borderColor: 'border-green-500' },
  };

  return (
    <div className="flex flex-col flex-1">
      <ul className="flex flex-row w-full px-12 h-5 mb-6 mt-10">
        <li className={`border-l-3 border-r-[1.5px] border-b-3 ${twColors[color].borderColor} flex-1 relative`}>
          <div
            className={
              'mt-3 absolute -left-[1.5px] -translate-x-1/2 translate-y-1/2 w-full flex justify-center items-center'
            }
          >
            {startNumber}
          </div>
        </li>
        {Array.from({ length: nrOfSteps - 1 }, (_, i) => (
          <li key={i} className={`border-x-[1.5px] border-b-3 ${twColors[color].borderColor} flex-1 relative`}>
            {i + 1 === questionPosition && (
              <Icon isSolutionVisible={isSolutionVisible} solution={solution} handleClick={handleClick} color={color} />
            )}
          </li>
        ))}
        <li className={`border-l-[1.5px] border-r-3 border-b-3 ${twColors[color].borderColor} flex-1 relative`}>
          <>
            {questionPosition === nrOfSteps && (
              <Icon isSolutionVisible={isSolutionVisible} solution={solution} handleClick={handleClick} color={color} />
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
  color: 'blue' | 'green';
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
          'mt-3 w-full flex justify-center items-center absolute -left-[1.5px] -translate-x-1/2 translate-y-1/2'
        }
      >
        {solution}
      </div>
    )}
  </>
);

export default LineGraphExercise;
