import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load about sections
const Vision = lazy(() => import('../sections/About/Vision/Vision'));
const Metrics = lazy(() => import('../sections/About/Metrics/Metrics'));
const Team = lazy(() => import('../sections/About/Team/Team'));
const GetStarted = lazy(() => import('../sections/About/GetStarted/GetStarted'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '15vh';

const AboutPage = () => {
  return (
    <main style={{overflow: 'hidden'}}>
      <Suspense fallback={<GlobalLoader />}>
        <Vision />
        <WhiteSpace height={reducedWhiteSpaceHeight} />

        <Metrics />
        <WhiteSpace height={whiteSpaceHeight} />

        <Team />
        <WhiteSpace height={whiteSpaceHeight} />

        <GetStarted />
        <WhiteSpace height={whiteSpaceHeight} />

      </Suspense>
    </main>
  );
};

export default AboutPage;
