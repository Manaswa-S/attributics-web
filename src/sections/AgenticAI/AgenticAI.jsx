import Container from '../../components/layout/Container';
import { useState, useEffect } from 'react';
import discoveryBg from '../../assets/discovery_background.svg';
import discoveryVectorBg from '../../assets/discovery_background_vector.svg';

// Auto-scrolling questions/content
const scrollingQuestions = [
    "How do I drive discovery conversations for the new offerings with my users / customers?",
    "How can I reduce churn and increase customer lifetime value?",
    "How do I personalize experiences at scale without increasing costs?",
    "How can I identify upsell opportunities before customers leave?",
    "How do I automate campaigns while maintaining personalization?",
    "How can I turn data into actionable insights in real-time?",
];

const AgenticAI = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % scrollingQuestions.length);
        }, 4000); // Change every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section id="products" className="py-16 lg:py-24 bg-white">
            <Container>
                <div className="max-w-[989px] mx-auto">
                    {/* Top Section - Headline with CTA */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                        <div className="flex-1">
                            <h2 className="w-[630px] h-[70px] text-[50px] font-normal leading-[140%] text-[#131212] mb-3 font-sans">
                                Facing the same problems?
                            </h2>
                            <p className="w-[778px] h-[56px] text-[20px] font-normal leading-[140%] text-[#666] font-sans">
                                It's the growth that compounds. Intelligent agents continuously optimize engagement, retention, and expansion—turning every customer into a long-term value driver.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-[10px] px-[12px] py-[8px] w-[151px] h-[50px] bg-[#131212] text-white text-sm font-medium rounded-[4px] hover:bg-[#333] transition-colors justify-center whitespace-nowrap"
                            >
                                <span className="text-blue-400">✦</span>
                                <span>Book a call</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative w-[989px] overflow-hidden rounded-[4px]">
                        {/* Carousel Banner */}
                        <div 
                            className="relative w-[989px] h-[204px] overflow-hidden bg-gradient-to-br from-[#F2F2F2] to-[#FFA791]"
                        >
                            {/* Main background using SVG as image element */}
                            <img
                                src={discoveryBg}
                                alt="Background"
                                className="absolute inset-0 w-full h-full object-fill z-0"
                                style={{ 
                                    width: '100%', 
                                    height: '100%',
                                    display: 'block'
                                }}
                            />

                            {/* Vector lines background using SVG as image element - ON TOP */}
                            <img
                                src={discoveryVectorBg}
                                alt="Background pattern"
                                className="absolute inset-0 w-full h-full object-fill z-[1] opacity-100"
                                style={{ 
                                    width: '100%', 
                                    height: '100%',
                                    display: 'block'
                                }}
                            />

                            {/* Carousel slides */}
                            <div className="absolute inset-0 w-full h-full z-[20] flex items-center">
                                {scrollingQuestions.map((question, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center px-8 ${
                                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <div className="text-center max-w-[800px]">
                                            <p className="text-base lg:text-xl text-[#131212] leading-relaxed font-medium">
                                                {question}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center items-center gap-2 mt-6">
                        {scrollingQuestions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`rounded-full transition-all duration-300 cursor-pointer ${
                                    index === currentIndex
                                        ? 'w-8 h-1.5 bg-[#131212]'
                                        : 'w-2 h-2 bg-[#CCCCCC] hover:bg-[#999]'
                                }`}
                                type="button"
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AgenticAI;
