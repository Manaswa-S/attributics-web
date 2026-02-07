import Container from '../../components/layout/Container';
import { useState, useEffect, useCallback } from 'react';
import discoveryBg from '../../assets/discovery_background.svg';
import discoveryVectorBg from '../../assets/discovery_background_vector.svg';

// Auto-scrolling questions/content with bold segments
const scrollingQuestions = [
    <>How do I drive <strong>discovery conversations</strong> for the <strong>new offerings</strong> with my users / customers?</>,
    <>How can I <strong>reduce churn</strong> and increase <strong>customer lifetime value</strong>?</>,
    <>How do I <strong>personalize experiences</strong> at scale without <strong>increasing costs</strong>?</>,
    <>How can I identify <strong>upsell opportunities</strong> before customers leave?</>,
    <>How do I <strong>automate campaigns</strong> while maintaining <strong>personalization</strong>?</>,
    <>How can I turn <strong>data</strong> into <strong>actionable insights</strong> in real-time?</>,
];

const AgenticAI = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayIndex, setDisplayIndex] = useState(0);

    const goToSlide = useCallback((nextIndex) => {
        if (isAnimating) return;
        setIsAnimating(true);
        // Phase 1: fade out current text
        setTimeout(() => {
            setDisplayIndex(nextIndex);
            setCurrentIndex(nextIndex);
            // Phase 2: fade in new text (after display updates)
            setTimeout(() => {
                setIsAnimating(false);
            }, 50);
        }, 500); // wait for fade-out to finish
    }, [isAnimating]);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % scrollingQuestions.length;
            goToSlide(nextIndex);
        }, 4000);
        return () => clearInterval(interval);
    }, [currentIndex, goToSlide]);

    const handleDotClick = (index) => {
        if (index === currentIndex) return;
        goToSlide(index);
    };

    return (
        <section id="products" className="py-12 sm:py-16 lg:py-24 bg-white">
            <Container>
                <div className="w-full">
                    {/* Top Section - Headline with CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-8 lg:mb-12">
                        <div className="flex-1">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-snug sm:leading-tight lg:leading-[140%] text-[#131212] mb-3 font-sans">
                                Facing the same problems?
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed lg:leading-[140%] text-[#666] font-sans max-w-full lg:max-w-3xl">
                                It's the growth that compounds. Intelligent agents continuously optimize engagement, retention, and expansion—turning every customer into a long-term value driver.
                            </p>
                        </div>
                        <div className="shrink-0 w-full sm:w-auto">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 sm:px-3 sm:py-2 w-full sm:w-auto bg-[#131212] text-white text-sm font-medium rounded-sm hover:bg-[#333] transition-colors whitespace-nowrap"
                            >
                                <span className="text-blue-400">✦</span>
                                <span>Book a call</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative w-full overflow-hidden rounded-sm">
                        {/* Carousel Banner */}
                        <div
                            className="relative w-full h-40 sm:h-44 lg:h-48 overflow-hidden bg-linear-to-br from-[#F2F2F2] to-[#FFA791]"
                        >
                            {/* Main background using SVG as image element */}
                            <img
                                src={discoveryBg}
                                alt="Background"
                                className="absolute inset-0 w-full h-full object-cover z-0"
                            />

                            {/* Vector lines background using SVG as image element - ON TOP */}
                            <img
                                src={discoveryVectorBg}
                                alt="Background pattern"
                                className="absolute inset-0 w-full h-full object-cover z-1 opacity-100"
                            />

                            {/* Carousel slides - single slide, no overlap */}
                            <div className="absolute inset-0 w-full h-full z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                                <div
                                    className="text-center w-full max-w-2xl transition-opacity duration-500 ease-in-out"
                                    style={{ opacity: isAnimating ? 0 : 1 }}
                                >
                                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#131212] leading-relaxed font-normal [&>strong]:font-bold">
                                        {scrollingQuestions[displayIndex]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-6 lg:mt-8">
                        <div className="flex flex-row flex-wrap items-start content-start p-0" style={{ gap: '3px 4px', width: '90px', height: '6px' }}>
                            {scrollingQuestions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
                                            ? 'w-7.5 bg-[#131212]'
                                            : 'w-1.5 bg-[#CCCCCC] hover:bg-[#999]'
                                        }`}
                                    type="button"
                                    aria-label={`Go to slide ${index + 1}`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AgenticAI;
