import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load sections with explicit paths
const Hero = lazy(() => import('../sections/Hero/Hero'));
const Metrics = lazy(() => import('../sections/Metrics/Metrics'));
const Features = lazy(() => import('../sections/Features/Features'));
const AgenticAI = lazy(() => import('../sections/AgenticAI/AgenticAI'));
const Partners = lazy(() => import('../sections/Partners/Partners'));
const RevenueAutomation = lazy(() => import('../sections/RevenueAutomation/RevenueAutomation'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '15vh';

const HomePage = () => {
  return (
    <main>
      <Suspense fallback={<GlobalLoader />}>
        <Hero />
        <WhiteSpace height={reducedWhiteSpaceHeight} />
        
        <Metrics />
        <WhiteSpace height={whiteSpaceHeight} />

        <Features />
        <WhiteSpace height={whiteSpaceHeight} />

        <AgenticAI />
        <WhiteSpace height={whiteSpaceHeight} />
        
        <Partners />
        <WhiteSpace height={whiteSpaceHeight} />

        <RevenueAutomation />
        <WhiteSpace height={whiteSpaceHeight} />

      </Suspense>
    </main>
  );
};

export default HomePage;
