import LineGraphExercise from '@/components/LineGraphExercise';

export default function Home(): React.JSX.Element {
  return (
    <div className="flex h-screen justify-start flex-row border-2 border-red-500">
      <LineGraphExercise startNumber={60} step={1} questionPosition={9} numberOfSteps={11} />
      <LineGraphExercise startNumber={60} step={1} questionPosition={9} numberOfSteps={11} />
    </div>
  );
}
