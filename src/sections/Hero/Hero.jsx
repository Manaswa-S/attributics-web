import { siteContent } from '../../constants/content';
import unionPattern from '../../assets/Union.svg';
import { logoMap } from "./constants";
import { useState, useEffect } from 'react';

// Feature carousel slides
const featureSlides = [
    {
        id: 1,
        description: "It's the growth that compounds. Intelligent agents continuously optimize engagement, retention, and expansion—turning every customer into a long-term value driver."
    },
    {
        id: 2,
        description: "Autonomous AI agents that predict customer behavior, automate personalized journeys, and maximize revenue without manual intervention."
    },
    {
        id: 3,
        description: "Real-time decisioning at scale. Our agents analyze millions of signals to deliver the right message, to the right customer, at the perfect moment."
    }
];

const renderLogoRow = (row) => row.map((logo, index) => {
    const Logo = logoMap[logo];
    return (
        <div key={`r1-${index}`} className="flex items-center gap-2 mx-6 lg:mx-10 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default">
            <Logo className="w-auto h-10 text-gray-500" />
        </div>
    );
});
  
const LogoMarqueeRow = (row) => {
    return (
        <div className="flex overflow-hidden">
            <div className="flex w-max animate-marquee items-center shrink-0">
            {renderLogoRow(row)}
            {renderLogoRow(row)}
            </div>
        </div>
    );
};
  

const Hero = () => {
    const { hero, logoCloud } = siteContent;
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-scroll carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featureSlides.length);
        }, 4000); // Change every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="relative pt-24 pb-12 lg:pb-24 overflow-hidden bg-white mt-10">
            <div className="relative z-10 w-full px-[32px]">
                <div className="mx-auto text-center flex flex-col items-center">

                    {/* Hero Image Section */}
                    <div className="relative w-full max-w-[1376px] min-h-[600px] lg:h-[539px] overflow-hidden mb-8 lg:mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        {/* Dot Pattern Background with Gradient */}
                        <div className="absolute inset-0">
                            {/* Base dot pattern using SVG */}
                            <img
                                src={unionPattern}
                                alt="Dotted Gradient Pattern"
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient overlay to create the coral fade effect */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0) 60%)',
                                }}
                            />
                        </div>

                        {/* White Card Overlay */}
                        <div className="absolute top-[80px] left-[16px] right-[16px] lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[843px] bg-white rounded-[20px] p-6 lg:p-10 shadow-lg flex flex-col items-center gap-10 lg:gap-6">
                            {/* Icon and Title - Width 384px, Height 26px */}
                            <div className="flex items-center justify-center gap-2 w-[384px] h-[26px]">
                                <div className="w-6 h-6 bg-[#FF6758] rounded flex items-center justify-center flex-shrink-0">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                        <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                </div>
                                <span className="font-mono text-[20px] font-normal uppercase text-[#131212] leading-[100%] tracking-[0%] whitespace-nowrap">
                                    {hero.overlay.title}
                                </span>
                            </div>

                            {/* Description Carousel - Width 683px, Height 84px */}
                            <div className="relative w-full max-w-[683px] h-[84px] overflow-hidden">
                                {featureSlides.map((slide, index) => (
                                    <p
                                        key={slide.id}
                                        className={`absolute inset-0 text-[#131212] font-ibm-sans text-[20px] font-normal leading-[140%] text-center transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    >
                                        {slide.description}
                                    </p>
                                ))}
                            </div>

                            {/* Pagination Dots */}
                            <div className="flex justify-center items-center gap-1.5">
                                {featureSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleDotClick(index)}
                                        className={`rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide
                                            ? 'w-[50px] h-[3px] bg-[#FF6758]'
                                            : 'w-[6px] h-[6px] bg-[#FF6758] opacity-50 hover:opacity-80'
                                            }`}
                                        type="button"
                                        aria-label={`Go to slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                                <button className="flex flex-row justify-center items-center gap-[10px] w-[194px] h-[50px] bg-[#000000] text-white text-[16px] font-normal leading-[140%] rounded-[4px] hover:bg-[#1a1a1a] transition-colors cursor-pointer whitespace-nowrap" style={{ fontFamily: 'IBM Plex Sans, sans-serif', padding: '8px 12px' }}>
                                    <span className="text-[#6B9FFF]">✦</span>
                                    <span>See how it works</span>
                                    <span>→</span>
                                </button>
                                <button className="flex flex-row justify-center items-center gap-2 w-auto bg-white text-[#131212] text-[16px] font-normal leading-[140%] hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                    <span>Calculate your ROI</span>
                                    <span>→</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Logo Cloud Section - Marquee */}
                    <div className="w-full max-w-[1376px] h-[263px] mx-auto mt-4 lg:mt-6 flex flex-col items-center justify-center rounded-[20px] overflow-hidden">
                        <p className="font-mono text-[12px] uppercase tracking-wider text-[#131212] mb-8">
                            {logoCloud.title}
                        </p>

                        <div className="w-full overflow-hidden relative py-4 flex flex-col gap-6 lg:gap-8">
                            {/* Left Fade Overlay */}
                            <div className="absolute left-0 top-0 bottom-0 w-[50px] lg:w-[200px] z-20 pointer-events-none bg-gradient-to-r from-[#ffff] via-[#F4F4F4]/20 to-transparent"></div>
                            {/* Right Fade Overlay */}
                            <div className="absolute right-0 top-0 bottom-0 w-[50px] lg:w-[200px] z-20 pointer-events-none bg-gradient-to-l from-[#ffff] via-[#F4F4F4]/20 to-transparent"></div>
                            
                            {/* Row 1 - Scroll Left */}
                            {LogoMarqueeRow(logoCloud.rows[0])}
                            {/* Row 2 - Scroll Right */}
                            {LogoMarqueeRow(logoCloud.rows[1])}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;