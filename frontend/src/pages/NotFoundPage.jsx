import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';

const NotFoundPage = () => {
    return (
        <section className="pt-40 pb-20 lg:pt-48 lg:pb-28 bg-white min-h-[70vh] flex items-center">
            <Container>
                <div className="text-center max-w-2xl mx-auto">
                    <h1
                        className="text-6xl lg:text-8xl font-bold text-[#131212] mb-6"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                        404
                    </h1>
                    <h2
                        className="text-2xl lg:text-3xl font-normal text-[#131212] mb-4"
                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                        Page Not Found
                    </h2>
                    <p
                        className="text-base text-[#666] mb-8 leading-relaxed"
                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-3 bg-[#F5614D] hover:bg-[#E8503C] text-white font-medium rounded-lg transition-colors"
                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                        >
                            Go Home
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#131212] hover:bg-[#131212] hover:text-white text-[#131212] font-medium rounded-lg transition-colors"
                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default NotFoundPage;
