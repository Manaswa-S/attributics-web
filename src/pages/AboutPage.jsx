import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';

// Lazy load about sections
const About = lazy(() => import('../sections/About/About'));
const Team = lazy(() => import('../sections/Team/Team'));
const CTA = lazy(() => import('../sections/CTA/CTA'));

const AboutPage = () => {
  return (
    <main>
      <Suspense fallback={<GlobalLoader />}>
        <About />
        <Team />
        <CTA />
      </Suspense>
    </main>
  );
};

export default AboutPage;
