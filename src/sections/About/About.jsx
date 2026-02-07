import { siteContent } from '../../constants/content';
import { getGroupPhotos } from './constants';
import unionPattern from '../../assets/Union.svg';
import { Container } from '../../components';
import { useState, useEffect, useRef } from 'react';

const metricCards = [
    {
        index: 1,
        metric: 15,
        unit: "%",
        subheadline: "sub-headline",
    },
    {
        index: 2,
        metric: 100,
        unit: "+",
        subheadline: "sub-headline",
    },
    {
        index: 3,
        metric: 750,
        unit: "K",
        subheadline: "sub-headline",
    },
    {
        index: 4,
        metric: 15,
        unit: "%",
        subheadline: "sub-headline",
    }
]




const About = () => {
    const { about } = siteContent;
    const [animatedMetrics, setAnimatedMetrics] = useState(metricCards.map(() => 0));
    const hasAnimatedRef = useRef(false);
    const metricsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimatedRef.current) {
                        hasAnimatedRef.current = true;
                        // Animate each metric
                        metricCards.forEach((card, index) => {
                            const duration = 2000; // 2 seconds
                            const steps = 60; // 60 frames
                            const increment = card.metric / steps;
                            let currentStep = 0;

                            const timer = setInterval(() => {
                                currentStep++;
                                if (currentStep >= steps) {
                                    setAnimatedMetrics((prev) => {
                                        const newMetrics = [...prev];
                                        newMetrics[index] = card.metric;
                                        return newMetrics;
                                    });
                                    clearInterval(timer);
                                } else {
                                    setAnimatedMetrics((prev) => {
                                        const newMetrics = [...prev];
                                        newMetrics[index] = Math.floor(increment * currentStep);
                                        return newMetrics;
                                    });
                                }
                            }, duration / steps);
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (metricsRef.current) {
            observer.observe(metricsRef.current);
        }

        return () => {
            if (metricsRef.current) {
                observer.unobserve(metricsRef.current);
            }
        };
    }, []);

    return (
        <section id="about" className="py-16 lg:py-24 bg-white mt-10">
            {/* About Section */}
            <div className="relative w-full max-w-360 mx-auto px-40.75">
                {/* Who Are We Section - Group 99: 1113px × 468px */}
                <div className="relative w-full max-w-278.25 h-117 mb-24">
                    {/* Grid Layout for Side-by-Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start h-full">

                        {/* Left Content - 512px wide */}
                        <div className="w-lg flex flex-col items-start gap-3.25 pt-17">
                            <p className="w-lg h-5.25 text-[16px] font-normal leading-[130%] uppercase text-black"
                                style={{ fontFamily: 'IBM Plex Sans, sans-serif', letterSpacing: '0%' }}>
                                WHO ARE WE
                            </p>
                            <h2 className="w-111.75 h-35 text-[50px] font-medium leading-[140%] text-black"
                                style={{ fontFamily: 'Noto Sans, sans-serif', letterSpacing: '0%' }}>
                                {about.whoAreWe.headline}
                            </h2>
                            <p className="w-lg h-28 text-[20px] font-normal leading-[140%] text-[#131313]"
                                style={{ fontFamily: 'IBM Plex Sans, sans-serif', letterSpacing: '0%' }}>
                                {about.whoAreWe.description}
                            </p>
                        </div>

                        {/* Right Image - 473px × 468px */}
                        <div className="w-118.25 h-117 items-end">
                            <div className="w-full h-full bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
                                <img src={getGroupPhotos('1')} alt="Group Photo" className="w-full h-full object-cover rounded-[10px]" loading='lazy' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Catchy Statement Section */}
                <div className="relative min-h-52.5 w-full max-w-360 text-center mb-24">
                    <h3 className="text-[32px] lg:text-[40px] font-normal leading-[140%] text-black italic max-w-225 mx-auto"
                        style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                        "{about.statement}"
                    </h3>
                </div>

                {/* Who Are We Section - Group 99: 1113px × 468px */}
                <div className="relative w-full max-w-278.25 h-117">
                    {/* Grid Layout for Side-by-Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start h-full">
                        {/* Left Image - 473px × 468px */}
                        <div className="w-118.25 h-117 ">
                            <div className="w-full h-full bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
                                <img src={getGroupPhotos('2')} alt="Group Photo" className="w-full h-full object-cover rounded-[10px]" loading='lazy' />
                            </div>
                        </div>
                        {/* Right Content - 512px wide */}
                        <div className="w-lg flex flex-col items-start gap-3.25 pt-17">
                            <p className="text-[16px] font-normal leading-[130%] uppercase text-black"
                                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                MISSION & VISION
                            </p>
                            <div className="space-y-6">
                                {about.missionVision.map((item, index) => (
                                    <p key={index} className="text-[20px] font-normal leading-[140%] text-[#131313]"
                                        style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Section */}
            <Container>
                <div className="mx-auto px-11 relative w-full h-150 lg:h-134.75 overflow-hidden mb-8 lg:mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {/* Dot Pattern Background with Gradient */}
                    <div className="absolute inset-0">
                        {/* Base dot pattern using SVG */}
                        <img
                            src={unionPattern}
                            alt="Dotted Gradient Pattern"
                            className="w-full h-full object-cover"
                            loading='lazy'
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
                        ref={metricsRef}
                        className="relative rounded-[20px] border flex items-center mx-auto"
                        style={{
                            width: '1289px',
                            height: '271px',
                            maxWidth: '100%',
                            top: '204px',
                            background: '#FFFFFFCC',
                            border: '1px solid #C9C9C9',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            paddingTop: '40px',
                            paddingRight: '50px',
                            paddingBottom: '40px',
                            paddingLeft: '50px',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div className='flex items-center justify-between w-full'>
                            {metricCards.map((card, index) => (
                                <div
                                    key={index}
                                    className="w-36.5 h-32.5 flex flex-col items-center justify-center text-center"
                                >
                                    {/* Headline */}
                                    <p
                                        className="
                                        font-ibm-mono
                                        font-normal
                                        text-[80px]
                                        leading-[100%]
                                        uppercase
                                        tracking-[0]
                                        text-[#131212]
                                        "
                                    >
                                        {animatedMetrics[index]}
                                        {card.unit}
                                    </p>

                                    {/* Subheadline */}
                                    <p
                                        className="
                                            font-ibm-mono
                                            font-normal
                                            text-[20px]
                                            leading-[100%]
                                            tracking-[0]
                                            uppercase
                                            text-[#131212]
                                        "
                                    >
                                        {card.subheadline}
                                    </p>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

        </section>
    );
};

export default About;
