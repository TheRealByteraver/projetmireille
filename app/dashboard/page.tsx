'use client';
import Dashboard from '@/components/pages/Dashboard';
import AuthenticatedRoute from '@/components/system/AuthenticatedRoute';

const Home = (): React.JSX.Element => (
  <AuthenticatedRoute>
    <Dashboard />
  </AuthenticatedRoute>
);

export default Home;
