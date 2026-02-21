import { hero, logoCloud } from '../../../constants/content';
import { logoMap } from "./constants";
import { Block } from '../../../components/layout/Block';
import { useState, useEffect, useRef } from 'react';
import Backdrop from '../../../components/Backdrop/Backdrop';

// Feature carousel slides
const featureSlides = [
    {
        id: 1,
        description:
            "It's the growth that compounds. Intelligent agents continuously optimize engagement, retention, and expansion—turning every customer into a long-term value driver."
    },
    {
        id: 2,
        description:
            "Autonomous AI agents that predict customer behavior, automate personalized journeys, and maximize revenue without manual intervention."
    },
    {
        id: 3,
        description:
            "Real-time decisioning at scale. Our agents analyze millions of signals to deliver the right message, to the right customer, at the perfect moment."
    }
];

const renderLogoRow = (row) =>
    row.map((logo, index) => {
        const logoUrl = logoMap[logo];
        if (!logoUrl) return null;

        return (
            <div
                key={`logo-${index}`}
                className="flex items-center lg:mx-14 mx-8"
            >
                <img src={logoUrl} alt={logo} className="h-10 w-auto" />
            </div>
        );
    });

const LogoMarqueeRow = (row) => (
    <div className="flex overflow-hidden">
        <div className="flex w-max items-center shrink-0 animate-marquee">
            {renderLogoRow(row)}
            {renderLogoRow(row)}
        </div>
    </div>
);

const Hero = () => {
    const [index, setIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
    
    const intervalRef = useRef(null);
    
    const triggerChange = (nextIndexFn) => {
        setIsChanging(true);
        
        setTimeout(() => {
            setIndex(nextIndexFn);
            setIsChanging(false);
        }, 350);
    };
    
    const startAutoplay = () => {
        stopAutoplay(); // prevent stacked intervals
        
        intervalRef.current = setInterval(() => {
            triggerChange((prev) => (prev + 1) % featureSlides.length);
        }, 3500);
    };
    
    const stopAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
    
    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay();
    }, []);
    
    const handleDotClick = (i) => {
        if (i === index) return;
        
        stopAutoplay();
        triggerChange(() => i);
        startAutoplay();
    };
    
    const longestSlide = featureSlides.reduce((a, b) =>
        a.description.length > b.description.length ? a : b
    );

    return (
        <Block>
            <section className="relative min-h-screen flex flex-col">

                {/* ===== Hero Area ===== */}
                <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-xl">

                    {/* Background Mask */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <Backdrop />
                    </div>

                    {/* ===== Glass Card ===== */}
                    <div
                        className="
                            relative z-10
                            w-[100%]
                            max-w-3xl
                            flex flex-col
                            gap-10
                            p-8 lg:p-12
                            rounded-xl
                        "
                        style={{
                            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.1) 105%)', 
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                        }}
                    >
                        {/* Title Section */}
                        <div className="flex items-center justify-center gap-3 text-center">
                            <div className="w-7 h-7 bg-[#FF6758] rounded flex items-center justify-center">
                                <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="45" height="45" rx="4.5" fill="#FF6758"/>
                                    <path d="M26.5742 15H34.2885V22.7143" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M34.2863 15L23.3898 25.8964C23.2096 26.0731 22.9672 26.1721 22.7148 26.1721C22.4624 26.1721 22.2201 26.0731 22.0398 25.8964L17.6041 21.4607C17.4239 21.284 17.1815 21.1851 16.9291 21.1851C16.6767 21.1851 16.4344 21.284 16.2541 21.4607L9.21484 28.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <h2 className="hero-title">
                                {hero.overlay.title}
                            </h2>
                        </div>

                        {/* Carousel */}
                        <div className="relative w-full flex justify-center">
                            {/* Invisible height allocator */}
                            <p className="hero-description text-center opacity-0 pointer-events-none">
                                {longestSlide.description}
                            </p>

                            {/* Animated text */}
                            <p
                                className={`
                                    absolute inset-0 hero-description text-center
                                    transition-all duration-500 ease-in-out
                                    ${isChanging
                                    ? "opacity-0 blur-[1px] scale-[0.99]"
                                    : "opacity-100 blur-0 scale-100"}
                                `}
                                >
                                {featureSlides[index].description}
                            </p>
                        </div>


                        {/* Pagination */}
                        <div className="flex justify-center gap-2 items-center">
                            {featureSlides.map((_, i) => (
                                <button
                                key={i}
                                onClick={() => handleDotClick(i)}
                                className={`rounded-full cursor-pointer transition-all duration-300 ${
                                    i === index
                                    ? 'w-8 h-1 bg-[#FF6758]'
                                    : 'w-2 h-2 bg-[#FF6758] opacity-50'
                                }`}
                                />
                            ))}
                        </div>


                        {/* CTA Section */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-neutral-900 transition">
                                <span className="text-[#6B9FFF]">✦</span>
                                <p className='hero-button-label'>See how it works</p>
                                <span>→</span>
                            </button>

                            <button className="flex items-center gap-2 text-[#131212] hover:opacity-70 transition">
                                <p className='hero-button-label' style={{color: 'black'}}>Calculate your ROI</p>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ===== Logo Cloud ===== */}
                <div className="w-full py-8 flex flex-col items-center gap-6 overflow-hidden">
                    <p className="section-eyebrow">
                        {logoCloud.title}
                    </p>

                    <div className="w-full overflow-hidden mask-fade-x" style={{ '--fade': '10px' }}>
                        {LogoMarqueeRow(logoCloud.rows[0])}
                    </div>
                </div>

            </section>
        </Block>
    );
};

export default Hero;
