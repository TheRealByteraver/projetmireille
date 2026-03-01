'use client';
const LandingPage = dynamic(() => import('@/components/pages/LandingPage'), { ssr: false });
import dynamic from 'next/dynamic';

const Home = (): React.JSX.Element => <LandingPage />;
export default Home;
