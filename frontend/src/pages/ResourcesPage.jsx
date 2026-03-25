import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load about sections
const Featured = lazy(() => import('../sections/Resources/Featured'));
const Stories = lazy(() => import('../sections/Resources/Stories'));
const Recents = lazy(() => import('../sections/Resources/Recents'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '15vh';

const ResourcesPage = () => {
  return (
    <main style={{overflow: 'hidden'}}>
      <Suspense fallback={<GlobalLoader />}>
        <Featured />
        <WhiteSpace height={reducedWhiteSpaceHeight} />

        <Stories />
        <WhiteSpace height={reducedWhiteSpaceHeight} />

        <Recents />
        {/* <WhiteSpace height={whiteSpaceHeight} /> */}

      </Suspense>
    </main>
  );
};

export default ResourcesPage;
