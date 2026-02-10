import { siteContent } from '../../constants/content';
import unionPattern from '../../assets/Union.svg';
import { logoMap } from "./constants";
import { useState, useEffect } from 'react';

import { Block } from '../../components/layout/Block';

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
    const logoUrl = logoMap[logo];
    if (!logoUrl) return null; // Skip if logo doesn't exist
    return (
        <div key={`r1-${index}`} className="flex items-center gap-2 mx-6 lg:mx-10 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default">
            <img src={logoUrl} alt={logo} className="w-auto h-10" />
        </div>
    );
});

const LogoMarqueeRow = (row, reverse = false) => {
    return (
        <div className="flex overflow-hidden">
            <div className={`flex w-max items-center shrink-0 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
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
        <Block height='100vh'>
            <div className="h-full w-full items-center relative">

                {/* Hero Image Section */}
                <div className="h-[75%] relative w-full animate-fade-in-up" style={{ animationDelay: '0.2s'}}>
                {/* Dot Pattern Background with Gradient */}
                    <div className="absolute inset-0">
                        {/* Base dot pattern using SVG */}
                        <img
                            src={unionPattern}
                            alt="Dotted Gradient Pattern"
                            className="w-full h-full object-cover"
                            loading='eager'
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
                    <div
                        className="
                            relative 
                            top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2

                            rounded-[20px]
                            flex
                            flex-col
                            items-center

                            h-[70%]
                            w-[90%]
                            lg:w-[50%]
                            lg:h-[55%]
                            py-8

                            lg:px-20
                            lg:py-10
                            lg:gap-[40px]
                        "
                        style={{
                            background: '#FFFFFFCC',
                            border: '1px solid #C9C9C9',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                        }}
                    >
                        {/* Icon and Title - Width 384px, Height 26px */}
                        <div className="h-[25%] flex justify-center items-center text-center gap-2 w-full px-10"> 
                            <div className="w-6 h-6 bg-[#FF6758] rounded flex items-center justify-center shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                    <polyline points="17 6 23 6 23 12"></polyline>
                                </svg>
                            </div>
                            <span className="font-mono text-[20px] font-normal uppercase text-[#131212] leading-[100%] tracking-[0%]">
                                {hero.overlay.title}
                            </span>
                        </div>

                        {/* Description Carousel - Width 683px, Height 84px */}
                        <div className="h-[45%] relative w-full">
                            {featureSlides.map((slide, index) => (
                               <p
                                    key={slide.id}
                                    className={`
                                    absolute inset-0
                                    flex items-center justify-center
                                    text-[#131212]
                                    text-[16px] sm:text-[18px] lg:text-[20px]
                                    leading-[140%]
                                    text-center
                                    transition-opacity duration-700
                                    ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
                                    px-3
                               `}
                                >
                                    {slide.description}
                                </p>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        <div className="h-[5%] flex justify-center items-center" style={{gap: '4px' }}>
                            {featureSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                                        index === currentSlide
                                            ? 'w-12.5 h-0.75 bg-[#FF6758]'
                                            : 'w-1.5 h-1.5 bg-[#FF6758] opacity-50 hover:opacity-80'
                                    }`}
                                    type="button"
                                    aria-label={`Go to slide ${index + 1}`}
                                ></button>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="h-[25%] flex flex-col sm:flex-row gap-6 sm:gap-8 justify-end items-center"> 
                            <button className="flex flex-row justify-center items-center gap-2.5 w-full sm:w-48.5 h-12.5 bg-[#000000] text-white text-[16px] font-normal leading-[140%] rounded-sm hover:bg-[#1a1a1a] transition-colors cursor-pointer whitespace-nowrap" style={{ fontFamily: 'IBM Plex Sans, sans-serif', padding: '8px 12px' }}>
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
                <div
                className="
                relative 
                    h-[25%]
                    w-full
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-[20px]
                    overflow-hidden

                    pt-8
                    pb-6
                    lg:pt-12
                    lg:pb-6
                " 
                >
                    <p className="relative h-[30%] font-mono text-[12px] uppercase tracking-wider text-[#131212] text-center">
                        {logoCloud.title}
                    </p>

                    <div
                    className="
                        h-[70%]
                        w-full
                        overflow-hidden
                        relative
                        flex
                        flex-col
                        gap-6 lg:gap-6
                        mask-fade-x
                    "
                    style={{ '--fade': '15px' }}
                    >
                        {/* Row 1 - Scroll Left */}
                        {LogoMarqueeRow(logoCloud.rows[0])}

                        {/* Row 2 - Scroll Right */}
                        {LogoMarqueeRow(logoCloud.rows[1], true)}
                    </div>
                </div>

            </div>
        </Block>
    );
};

export default Hero;