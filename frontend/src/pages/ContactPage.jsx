import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';
import { useSearchParams } from 'react-router-dom';

// Lazy load sections with explicit paths
const ContactForm = lazy(() => import('../sections/Contact/Contact'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '15vh';

const ContactPage = () => {
    const [searchParams] = useSearchParams();

    const formType = searchParams.get("type");

    let content;

    switch (formType) {
        case "audit":
            content = <ContactForm />;
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

export default ContactPage;
