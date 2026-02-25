import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load about sections
const VisionTwo = lazy(() => import('../sections/About/VisionTwo/VisionTwo'));
const Team = lazy(() => import('../sections/About/Team/Team'));
const GetStarted = lazy(() => import('../sections/About/GetStarted/GetStarted'));

const moreWhiteSpaceHeight = '20vh';
const whiteSpaceHeight = '15vh';

const AboutPage = () => {
  return (
    <main style={{overflow: 'hidden'}}>
      <Suspense fallback={<GlobalLoader />}>
        {/* <Vision /> */}
        <VisionTwo />


        {/* <Metrics /> */}
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
