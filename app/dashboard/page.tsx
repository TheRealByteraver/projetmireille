'use client';
const AuthenticatedRoute = dynamic(() => import('@/components/system/AuthenticatedRoute'), { ssr: false });
const Dashboard = dynamic(() => import('@/components/pages/Dashboard'), { ssr: false });
import dynamic from 'next/dynamic';

const Home = (): React.JSX.Element => (
  <AuthenticatedRoute>
    <Dashboard />
  </AuthenticatedRoute>
);

export default Home;
