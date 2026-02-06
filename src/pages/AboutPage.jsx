import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';

// Lazy load about sections
const About = lazy(() => import('../sections/About/About'));
const Team = lazy(() => import('../sections/Team/Team'));

const AboutPage = () => {
  return (
    <main style={{overflow: 'hidden'}}>
      <Suspense fallback={<GlobalLoader />}>
        <About />
        <Team />
      </Suspense>
    </main>
  );
};

export default AboutPage;
