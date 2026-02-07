import { useState } from 'react';
import Container from '../../components/layout/Container';
import { siteContent } from '../../constants/content';
import mainCard01 from '../../assets/logo/main_01.png';
import mainCard02 from '../../assets/logo/main_02png.png';
import mainCard03 from '../../assets/logo/main_03png.png';

const caseStudies = [
    {
        image: mainCard01,
        stat: '11% MORE',
        title: 'ORGANIC LEADS',
        description: 'Driving digital transformation with MarTech in the Automobile industry',
    },
    {
        image: mainCard02,
        stat: '10X BOOSTS IN',
        title: 'CONVERSION RATES',
        description: 'Powering flexibility with a composable CDP',
    },
    {
        image: mainCard03,
        stat: '15% REVENUE',
        title: 'GROWTH',
        description: 'Turning every lead into an opportunity with Data & CRM',
    },
    {
        image: mainCard01,
        stat: '25% FASTER',
        title: 'TIME TO MARKET',
        description: 'Accelerating product launches with AI-powered automation',
    },
];

const Metrics = () => {
    const { metrics } = siteContent;
    const [expandedCard, setExpandedCard] = useState(0);

    return (
        <section id="about" className="py-16 lg:py-24 bg-white">
            <Container className="px-4">
                {/* Headline */}
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="mx-auto max-w-2xl text-2xl lg:text-[32px] font-bold leading-snug lg:leading-tight text-center text-[#131212]">
                        {metrics.headline}{' '}
                        <span className="text-[#F5614D]">{metrics.highlightedText}</span>
                    </h2>
                </div>

                {/* Case Study Cards - Responsive Layout */}
                <div className="flex flex-col lg:flex-row justify-center items-stretch gap-5 lg:gap-5 max-w-7xl mx-auto">
                    {caseStudies.map((study, index) => {
                        const isExpanded = expandedCard === index;
                        return (
                            <div
                                key={index}
                                onMouseEnter={() => setExpandedCard(index)}
                                onMouseLeave={() => setExpandedCard(0)}
                                className="relative rounded-md border border-[#747474] cursor-pointer bg-white shrink-0 overflow-hidden p-2 flex flex-row transition-[width] duration-700 ease-in-out h-55"
                                style={{
                                    width: isExpanded ? '450px' : '220px',
                                }}
                            >
                                {/* Image - always present, animates width */}
                                <div
                                    className="relative rounded-sm overflow-hidden shrink-0 transition-[width] duration-700 ease-in-out h-51"
                                    style={{
                                        width: isExpanded ? '144px' : '100%',
                                    }}
                                >
                                    <img
                                        src={study.image}
                                        alt={study.title}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Blurred text overlay - fades out when expanded */}
                                    <div
                                        className="absolute top-0 right-0 bottom-0 left-1/2 bg-white/80 backdrop-blur-md p-3 flex flex-col justify-start transition-opacity duration-500 ease-out"
                                        style={{
                                            opacity: isExpanded ? 0 : 1,
                                            pointerEvents: isExpanded ? 'none' : 'auto',
                                        }}
                                    >
                                        <h3 className="text-[#131212] text-sm font-normal uppercase leading-[100%] blur-[0.5px]" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                                            {study.stat}
                                        </h3>
                                        <h3 className="text-[#131212] text-sm font-normal uppercase leading-[100%] mt-1 blur-[0.5px]" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                                            {study.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Expanded content - always in DOM, transitions opacity & transform */}
                                <div
                                    className="flex-1 flex flex-col justify-between pl-5 overflow-hidden transition-all duration-700 ease-in-out"
                                    style={{
                                        opacity: isExpanded ? 1 : 0,
                                        transform: isExpanded ? 'translateX(0)' : 'translateX(20px)',
                                        transitionDelay: isExpanded ? '0.25s' : '0s',
                                    }}
                                >
                                    {/* Stats and Title */}
                                    <div className="flex-1 flex flex-col justify-start">
                                        <h3 className="text-[#131212] text-2xl font-normal uppercase leading-[100%]" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                                            {study.stat} {study.title}
                                        </h3>

                                        {/* Description */}
                                        <p
                                            className="text-[#131212] text-base font-normal leading-[140%] mt-3 transition-all duration-700 ease-out"
                                            style={{
                                                fontFamily: 'IBM Plex Sans, sans-serif',
                                                opacity: isExpanded ? 1 : 0,
                                                transform: isExpanded ? 'translateY(0)' : 'translateY(10px)',
                                                transitionDelay: isExpanded ? '0.4s' : '0s',
                                            }}
                                        >
                                            {study.description}
                                        </p>
                                    </div>

                                    {/* Read More Link */}
                                    <a
                                        href="#"
                                        className="text-[#131212] text-sm font-semibold flex items-center gap-1.5 hover:gap-2 transition-all duration-500 ease-out w-fit mt-3"
                                        style={{
                                            opacity: isExpanded ? 1 : 0,
                                            transform: isExpanded ? 'translateY(0)' : 'translateY(10px)',
                                            transitionDelay: isExpanded ? '0.55s' : '0s',
                                        }}
                                    >
                                        Read more <span>→</span>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default Metrics;
