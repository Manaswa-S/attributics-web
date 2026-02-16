import { siteContent } from '../../constants/content';
import { logoMap } from "./constants";
import { useState, useEffect } from 'react';
import { Block } from '../../components/layout/Block';
import unionBg from '../../assets/Union.svg';

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
                className="flex items-center mx-14 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
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
    const { hero, logoCloud } = siteContent;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featureSlides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <Block>
            <section className="relative min-h-screen flex flex-col">

                {/* ===== Hero Area ===== */}
                <div className="relative flex-1 flex items-center justify-center ">

                    {/* Background Mask */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div
                            className="absolute inset-0"
                            style={{
                                WebkitMaskImage: `url(${unionBg})`,
                                maskImage: `url(${unionBg})`,
                                WebkitMaskSize: 'cover',
                                maskSize: 'cover',
                                WebkitMaskPosition: 'center',
                                maskPosition: 'center',
                                WebkitMaskRepeat: 'no-repeat',
                                maskRepeat: 'no-repeat',
                                background:
                                    'linear-gradient(180deg, #FFFFFF 0%, #FFB5AC 50%, #FF6758 100%)',
                            }}
                        />

                        {/* Gradient overlay to create the coral fade effect */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.25) 90%',
                            }}
                        />
                    </div>

                    {/* ===== Glass Card ===== */}
                    <div
                        className="
                            relative z-10
                            w-[90%]
                            max-w-3xl
                            flex flex-col
                            gap-10
                            p-8 lg:p-12
                            rounded-xl
                        "
                        style={{
                            background:
                                'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.15) 105%)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(30px)',
                            border: '1px solid #C9C9C9',
                        }}
                    >
                        {/* Title Section */}
                        <div className="flex items-center justify-center gap-3 text-center">
                            <div className="w-7 h-7 bg-[#FF6758] rounded flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <polyline points="17 6 23 6 23 12" />
                                </svg>
                            </div>

                            <span className="font-mono text-lg uppercase text-[#131212]">
                                {hero.overlay.title}
                            </span>
                        </div>

                        {/* Carousel */}
                        <div className="relative w-full min-h-[80px] flex items-center justify-center">
                            {featureSlides.map((slide, index) => (
                                <p
                                    key={slide.id}
                                    className={`
                                        absolute inset-0
                                        flex items-center justify-center
                                        text-center
                                        text-base lg:text-lg
                                        leading-relaxed
                                        transition-opacity duration-700
                                        ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
                                    `}
                                >
                                    {slide.description}
                                </p>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-2">
                            {featureSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`rounded-full transition-all duration-300 ${
                                        index === currentSlide
                                            ? 'w-8 h-1 bg-[#FF6758]'
                                            : 'w-2 h-2 bg-[#FF6758] opacity-40'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-neutral-900 transition">
                                <span className="text-[#6B9FFF]">✦</span>
                                <span>See how it works</span>
                                <span>→</span>
                            </button>

                            <button className="flex items-center gap-2 text-[#131212] hover:opacity-70 transition">
                                <span>Calculate your ROI</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ===== Logo Cloud ===== */}
                <div className="w-full py-8 flex flex-col items-center gap-6 overflow-hidden">
                    <p className="font-mono text-sm uppercase tracking-wider text-[#131212] text-center">
                        {logoCloud.title}
                    </p>

                    <div className="w-full overflow-hidden mask-fade-x">
                        {LogoMarqueeRow(logoCloud.rows[0])}
                    </div>
                </div>

            </section>
        </Block>
    );
};

export default Hero;
