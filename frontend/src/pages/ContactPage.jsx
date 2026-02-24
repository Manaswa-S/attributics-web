import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';
import { useSearchParams } from 'react-router-dom';

// Lazy load sections with explicit paths
const ContactForm = lazy(() => import('../sections/Contact/General/General'));
const AuditForm = lazy(() => import('../sections/Contact/Audit/Audit'));
const CareerForm = lazy(() => import('../sections/Contact/Career/Career'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '15vh';

const HomePage = () => {
    const [searchParams] = useSearchParams();

    const formType = searchParams.get("type");

    let content;

    switch (formType) {
        case "audit":
            content = <AuditForm />;
            break;

        case "career":
            content = <CareerForm />;
            break;

        default:
            content = <ContactForm />;
    }

    return (
        <main>
            <Suspense fallback={<GlobalLoader />}>
                {content}
                <WhiteSpace height={reducedWhiteSpaceHeight} />
            </Suspense>
        </main>
    );
};

export default HomePage;
