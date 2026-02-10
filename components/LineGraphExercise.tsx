'use client';

import { useState } from 'react';
import PentagonIcon from './PentagonIcon';

type Props = {
  startNumber: number;
  questionPosition: number;
  numberOfSteps: number;
  step: number;
};

const LineGraphExercise = (props: Props): React.JSX.Element => {
  // PROPS
  const { startNumber, questionPosition, numberOfSteps, step } = props;

  // STATE
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);

  // METHODS
  const handleClick = () => setIsSolutionVisible(true);

  // VARS
  const endNumber = startNumber + (numberOfSteps - 1) * step;
  const solution = startNumber + (questionPosition - 1) * step;

  return (
    <div className="flex flex-col border-2 border-blue-500 flex-1">
      <ul className="flex flex-row w-full px-12 h-5 mb-6 mt-10">
        <li className="border-l-3 border-r-[1.5px] border-b-3 border-green-500 flex-1 relative">
          <div
            className={
              'mt-3 absolute -left-[1.5px] -translate-x-1/2 translate-y-1/2 w-full flex justify-center items-center'
            }
          >
            {startNumber}
          </div>
        </li>
        {Array.from({ length: numberOfSteps - 3 }, (_, i) => (
          <li key={i} className="border-x-[1.5px] border-b-3 border-green-500 flex-1 relative">
            {i + 2 === questionPosition && (
              <Icon isSolutionVisible={isSolutionVisible} solution={solution} handleClick={handleClick} />
            )}
          </li>
        ))}
        <li className="border-l-[1.5px] border-r-3 border-b-3 border-green-500 flex-1 relative">
          <>
            {questionPosition === numberOfSteps - 1 && (
              <Icon isSolutionVisible={isSolutionVisible} solution={solution} handleClick={handleClick} />
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
};

const Icon = ({ isSolutionVisible, solution, handleClick }: IconProps): React.JSX.Element => (
  <>
    <div
      className="absolute w-12 h-12 -left-[1.5px] -translate-x-1/2 bottom-2.5 hover:cursor-pointer"
      onClick={handleClick}
    >
      <PentagonIcon color="green" />
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
