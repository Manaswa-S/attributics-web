import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load about sections
const HeroTwo = lazy(() => import('../sections/Resources/HeroTwo/HeroTwo'));
const Local = lazy(() => import('../sections/Resources/Local/Local'));
const Medium = lazy(() => import('../sections/Resources/Medium/Medium'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '15vh';

const ResourcesPage = () => {
  return (
    <main style={{overflow: 'hidden'}}>
      <Suspense fallback={<GlobalLoader />}>
        <HeroTwo />
        {/* <WhiteSpace height={reducedWhiteSpaceHeight} /> */}

        <Local />
        {/* <WhiteSpace height={reducedWhiteSpaceHeight} /> */}

        <Medium />
        <WhiteSpace height={reducedWhiteSpaceHeight} />
      </Suspense>
    </main>
  );
};

export default ResourcesPage;
