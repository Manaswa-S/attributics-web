import { Suspense, lazy } from 'react';
import { Header, Footer } from './components';
import GlobalLoader from './components/ui/Loader/GlobalLoader';

// Lazy load sections with explicit paths
const Hero = lazy(() => import('./sections/Hero/Hero'));
const Metrics = lazy(() => import('./sections/Metrics/Metrics'));
const Features = lazy(() => import('./sections/Features/Features'));
const AgenticAI = lazy(() => import('./sections/AgenticAI/AgenticAI'));
const RevenueAutomation = lazy(() => import('./sections/RevenueAutomation/RevenueAutomation'));
const Newsletter = lazy(() => import('./sections/Newsletter/Newsletter'));

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Suspense fallback={<GlobalLoader />}>
          <Hero />
          <Metrics />
          <Features />
          <AgenticAI />
          <RevenueAutomation />
          <Newsletter />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
