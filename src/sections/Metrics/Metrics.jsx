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
                                className={`relative rounded-[6px] border transition-all duration-500 ease-out cursor-pointer bg-white flex-shrink-0 overflow-hidden ${isExpanded
                                    ? 'w-full lg:w-[492px] h-auto lg:h-[220px] border-[#747474] p-2 flex flex-col lg:flex-row gap-5 lg:gap-5'
                                    : 'w-full lg:w-[235px] h-[220px] border-[#747474] hover:border-[#999] p-2'
                                    }`}
                            >
                                {isExpanded ? (
                                    <>
                                        {/* Expanded State: Image on left, content on right */}
                                        <div className="relative rounded-[4px] overflow-hidden transition-all duration-500 flex-shrink-0 w-full lg:w-[144px] h-[140px] lg:h-[204px]">
                                            <img
                                                src={study.image}
                                                alt={study.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between transition-all duration-500">
                                            {/* Stats and Title */}
                                            <div className="flex-1 flex flex-col justify-start">
                                                <h3 className="text-[#131212] text-2xl font-normal uppercase leading-[100%]" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                                                    {study.stat} {study.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-[#131212] text-base font-normal leading-[140%] mt-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                                    {study.description}
                                                </p>
                                            </div>

                                            {/* Read More Link */}
                                            <a
                                                href="#"
                                                className="text-[#131212] text-sm font-semibold flex items-center gap-1.5 hover:gap-2 transition-all duration-300 w-fit mt-3"
                                            >
                                                Read more <span>→</span>
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Collapsed State: Image with blurred text overlay */}
                                        <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                                            <img
                                                src={study.image}
                                                alt={study.title}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Blurred text overlay - positioned in top right */}
                                            <div className="absolute top-0 right-0 bottom-0 left-1/2 bg-white/80 backdrop-blur-md p-3 flex flex-col justify-start">
                                                <h3 className="text-[#131212] text-sm font-normal uppercase leading-[100%] blur-[0.5px]" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                                                    {study.stat}
                                                </h3>
                                                <h3 className="text-[#131212] text-sm font-normal uppercase leading-[100%] mt-1 blur-[0.5px]" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                                                    {study.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default Metrics;
