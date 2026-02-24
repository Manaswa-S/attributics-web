import { hero, logoCloud } from '../../../constants/home';
import { Block } from '../../../components/layout/Block';
import { useState, useEffect, useRef } from 'react';
import Backdrop from '../../../components/Backdrop/Backdrop';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button/Button';

const renderLogoRow = (row) =>
    row.map((logo, index) => {
        return (
            <div
                key={`logo-${index}`}
                className="flex items-center lg:mx-14 mx-8"
            >
                <img src={logo} alt='' className="h-10 w-auto" />
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
            triggerChange((prev) => (prev + 1) % hero.features.length);
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
    
    const longestSlide = hero.features.reduce((a, b) =>
        a.description.length > b.description.length ? a : b
    );

    return (
        <Block>
            <section className="relative lg:min-h-screen flex flex-col lg:mt-0 mt-20">

                {/* ===== Hero Area ===== */}
                <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-xl">

                    {/* Background Mask */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <Backdrop />
                    </div>

                    {/* ===== Glass Card ===== */}
                    <div
                        className="
                            mt-30
                            mb-15
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
                                {hero.headline}
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
                                {hero.features[index].description}
                            </p>
                        </div>


                        {/* Pagination */}
                        <div className="flex justify-center gap-2 items-center">
                            {hero.features.map((_, i) => (
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
                            <Link to="/contact">
                                <Button
                                    size='md'
                                    variant="primary"
                                    className="text-white bg-black rounded-lg"
                                >
                                    <span className="text-[#6B9FFF]">✦</span>
                                    {hero.cta.primary}
                                    <span>→</span>
                                </Button>
                            </Link>

                            <Link to="/contact">
                                <Button
                                    size='md'
                                    variant="secondary"
                                    className="text-black rounded-lg"
                                >
                                    {hero.cta.secondary}
                                    <span>→</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ===== Logo Cloud ===== */}
                <div className="w-full py-8 flex flex-col items-center gap-6 overflow-hidden">
                    <p className="section-eyebrow">
                        {logoCloud.eyebrow}
                    </p>

                    <div className="w-full overflow-hidden mask-fade-x" style={{ '--fade': '10px', backgroundColor: '' }}
                    >
                        {LogoMarqueeRow(logoCloud.clients)}
                    </div>
                </div>

            </section>
        </Block>
    );
};

export default Hero;
