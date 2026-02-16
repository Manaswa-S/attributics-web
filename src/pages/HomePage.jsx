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



const HomePage = () => {
  return (
    <main>
      <Suspense fallback={<GlobalLoader />}>
        <Hero />
        <WhiteSpace height='20vh'/>
        
        <Metrics />
        <WhiteSpace height='20vh'/>

        <Features />
        <WhiteSpace height='20vh'/>

        <AgenticAI />
        <WhiteSpace height='20vh'/>
        
        <Partners />
        <WhiteSpace height='20vh'/>

        <RevenueAutomation />
        <WhiteSpace height='20vh'/>

        {/* <WhiteSpace height='10vh' background='red'/> */}

      </Suspense>
    </main>
  );
};

export default HomePage;
