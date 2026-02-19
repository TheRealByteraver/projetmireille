import LandingPage from '@/components/pages/LandingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Home = (): React.JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <LandingPage />
  </QueryClientProvider>
);

export default Home;
