import unionPattern from '../../../assets/Union.svg';
import { Container } from '../../../components';
import { useState, useEffect, useRef } from 'react';

import Block from '../../../components/layout/Block';

const metricCards = [
    { metric: 15, unit: "%", subheadline: "sub-headline" },
    { metric: 100, unit: "+", subheadline: "sub-headline" },
    { metric: 750, unit: "K", subheadline: "sub-headline" },
    { metric: 15, unit: "%", subheadline: "sub-headline" }
];

const Metrics = () => {
    const [animatedMetrics, setAnimatedMetrics] = useState(metricCards.map(() => 0));
    const hasAnimatedRef = useRef(false);
    const metricsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimatedRef.current) {
                    hasAnimatedRef.current = true;

                    metricCards.forEach((card, index) => {
                        const steps = 60;
                        const increment = card.metric / steps;
                        let step = 0;

                        const timer = setInterval(() => {
                            step++;
                            setAnimatedMetrics(prev => {
                                const copy = [...prev];
                                copy[index] = step >= steps ? card.metric : Math.floor(step * increment);
                                return copy;
                            });

                            if (step >= steps) clearInterval(timer);
                        }, 2000 / steps);
                    });
                }
            },
            { threshold: 0.3 }
        );

        metricsRef.current && observer.observe(metricsRef.current);
        return () => metricsRef.current && observer.unobserve(metricsRef.current);
    }, []);

    return (
        <Block xpad='15%'>
        <section id="about">
            {/* METRICS */}
            <div className="relative w-full h-95 lg:h-134.75 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
                    className="relative
                        rounded-[20px]
                        border
                        flex
                        items-center
                        justify-center
                        mx-auto

                        h-auto
                        py-6
                        sm:py-8

                        lg:h-[271px]
                        lg:py-0

                        top-16 sm:top-24 lg:top-[204px]

                        "
                    style={{
                        width: '1289px',
                        height: '271px',
                        maxWidth: '100%',
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
                    {/* <div className='flex items-center justify-between w-full'> */}
                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-6
                            place-items-center
                            w-full

                            lg:flex
                            lg:items-center
                            lg:justify-between
                        "
                    >
                        {metricCards.map((card, index) => (
                            <div
                                key={index}
                                className="w-36.5 h-32.5 flex flex-col items-center justify-center text-center gap-2"
                            >
                                {/* Headline */}
                                <p
                                    className="
                                        font-ibm-mono
                                        font-normal
                                        text-[42px]
                                        sm:text-[52px]
                                        lg:text-[80px]
                                        leading-[100%]
                                        uppercase
                                        tracking-[0]
                                        text-[#131212]"
                                >
                                    {animatedMetrics[index]}
                                    {card.unit}
                                </p>

                                {/* Subheadline */}
                                <p
                                    className="
                                        font-ibm-mono
                                        font-normal
                                        text-[12px]
                                        sm:text-[14px]
                                        lg:text-[20px]
                                        leading-[110%]
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
        </section>
        </Block>
    );
};

export default Metrics;
