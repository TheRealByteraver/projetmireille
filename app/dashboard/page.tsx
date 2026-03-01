'use client';
// const AuthenticatedRoute = dynamic(() => import('@/components/system/AuthenticatedRoute'), { ssr: false });
import AuthenticatedRoute from '@/components/system/AuthenticatedRoute';
// const Dashboard = dynamic(() => import('@/components/pages/Dashboard'), { ssr: false });

import Dashboard from '@/components/pages/Dashboard';
// import dynamic from 'next/dynamic';

const Home = (): React.JSX.Element => (
  <AuthenticatedRoute>
    <Dashboard />
  </AuthenticatedRoute>
);

export default Home;
