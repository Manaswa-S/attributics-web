import { useEffect, useRef } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Container from '../../components/layout/Container';
import { siteContent } from '../../constants/content';
import mainCard01 from '../../assets/logo/main_01.png';
import mainCard02 from '../../assets/logo/main_02png.png';
import mainCard03 from '../../assets/logo/main_03png.png';

const caseStudies = [
    {
        id: 1,
        image: mainCard01,
        stat: '11% MORE',
        title: 'ORGANIC LEADS',
        description: 'Driving digital transformation with MarTech in the Automobile industry',
    },
    {
        id: 2,
        image: mainCard02,
        stat: '10X BOOSTS IN',
        title: 'CONVERSION RATES',
        description: 'Powering flexibility with a composable CDP',
    },
    {
        id: 3,
        image: mainCard03,
        stat: '15% REVENUE',
        title: 'GROWTH',
        description: 'Turning every lead into an opportunity with Data & CRM',
    },
];

const Metrics = () => {
    const { metrics } = siteContent;
    const splideRef = useRef(null);

    useEffect(() => {
        if (splideRef.current) {
            const splide = new Splide(splideRef.current, {
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: '20px',
                autoplay: true,
                interval: 3000,
                speed: 800,
                easing: 'ease',
                pauseOnHover: true,
                pauseOnFocus: true,
                pagination: false,
                arrows: false,
                drag: true,
                focus: 0,
                trimSpace: false,
                breakpoints: {
                    1024: {
                        perPage: 2,
                        gap: '16px',
                    },
                    768: {
                        perPage: 1,
                        gap: '12px',
                    },
                },
            });

            splide.mount();

            return () => {
                splide.destroy();
            };
        }
    }, []);

    return (
        <section id="metrics" className="py-16 lg:py-24 bg-white">
            <Container>
                {/* Headline */}
                <div className="mb-12 lg:mb-16">
                    <h2 className="max-w-2xl text-2xl lg:text-[32px] font-bold leading-snug lg:leading-tight text-[#131212]">
                        {metrics.headline}{' '}
                        <span className="text-[#F5614D]">{metrics.highlightedText}</span>
                    </h2>
                </div>
            </Container>

            {/* Splide Carousel - Full Width with aligned padding */}
            <div className="w-full overflow-x-auto scrollbar-hide">
                <div 
                    className="splide metrics-carousel container-aligned-padding" 
                    ref={splideRef}
                    style={{
                        width: 'max-content',
                    }}
                >
                    <div className="splide__track">
                        <ul className="splide__list flex gap-[20px]">
                            {caseStudies.map((study) => {
                                return (
                                    <li
                                        key={study.id}
                                        className="splide__slide flex-shrink-0 w-[235px] lg:w-[265px]"
                                    >
                                        <div className="card-wrapper relative rounded-[6px] border border-[#747474] bg-white overflow-hidden p-2 h-[224px]">
                                            {/* Expanded State - shown via CSS when .is-active or :hover */}
                                            <div className="expanded-content absolute inset-2 flex flex-col lg:flex-row gap-5 w-auto h-auto">
                                                <div className="relative rounded-[4px] overflow-hidden flex-shrink-0 w-full lg:w-[144px] h-[140px] lg:h-[208px]">
                                                    <img
                                                        src={study.image}
                                                        alt={study.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1 flex flex-col justify-between py-1">
                                                    <div className="flex-1 flex flex-col justify-start">
                                                        <h3
                                                            className="text-[#131212] text-2xl font-normal uppercase leading-[100%]"
                                                            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                                                        >
                                                            {study.stat} {study.title}
                                                        </h3>

                                                        <p
                                                            className="text-[#131212] text-base font-normal leading-[140%] mt-3"
                                                            style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                                                        >
                                                            {study.description}
                                                        </p>
                                                    </div>

                                                    <a
                                                        href="#"
                                                        className="text-[#131212] text-sm font-semibold flex items-center gap-1.5 hover:gap-2 transition-all duration-300 w-fit mt-3"
                                                    >
                                                        Read more <span>→</span>
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Collapsed/Blurred State - shown via CSS when not active */}
                                            <div className="collapsed-content absolute inset-0 p-2 w-full h-full rounded-[4px] overflow-hidden">
                                                <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                                                    <div className="absolute inset-0">
                                                        <img
                                                            src={study.image}
                                                            alt={study.title}
                                                            className="w-full h-full object-cover blur-[2px]"
                                                        />
                                                        <div className="absolute inset-0 bg-white/20" />
                                                    </div>

                                                    <div
                                                        className="absolute top-0 right-0 bottom-0 left-1/2 p-3 flex flex-col justify-start"
                                                        style={{
                                                            background: 'rgba(255, 255, 255, 0.9)',
                                                            backdropFilter: 'blur(8px)',
                                                            WebkitBackdropFilter: 'blur(8px)',
                                                        }}
                                                    >
                                                        <h3
                                                            className="text-[#131212] text-sm font-normal uppercase leading-[100%]"
                                                            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                                                        >
                                                            {study.stat}
                                                        </h3>
                                                        <h3
                                                            className="text-[#131212] text-sm font-normal uppercase leading-[100%] mt-1"
                                                            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                                                        >
                                                            {study.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <style>{`
                /* Hide Splide pagination (also disabled in config) */
                .splide__pagination {
                    display: none;
                }

                /* Card state management — crossfade between expanded/collapsed */
                .metrics-carousel .card-wrapper .expanded-content {
                    opacity: 0;
                    transform: scale(0.98);
                    pointer-events: none;
                    z-index: 1;
                }

                .metrics-carousel .card-wrapper .collapsed-content {
                    opacity: 1;
                    transform: scale(1);
                    pointer-events: auto;
                    z-index: 2;
                }

                /* Active slide: show expanded, hide collapsed */
                .metrics-carousel .splide__slide.is-active .card-wrapper .expanded-content {
                    opacity: 1;
                    transform: scale(1);
                    pointer-events: auto;
                    z-index: 2;
                }

                .metrics-carousel .splide__slide.is-active .card-wrapper .collapsed-content {
                    opacity: 0;
                    transform: scale(0.98);
                    pointer-events: none;
                    z-index: 1;
                }

                /* On hover: collapse all, then expand only the hovered slide */
                .metrics-carousel .splide__track:has(.splide__slide:hover) .splide__slide .card-wrapper .expanded-content {
                    opacity: 0;
                    transform: scale(0.98);
                    pointer-events: none;
                    z-index: 1;
                }

                .metrics-carousel .splide__track:has(.splide__slide:hover) .splide__slide .card-wrapper .collapsed-content {
                    opacity: 1;
                    transform: scale(1);
                    pointer-events: auto;
                    z-index: 2;
                }

                .metrics-carousel .splide__track:has(.splide__slide:hover) .splide__slide:hover .card-wrapper .expanded-content {
                    opacity: 1;
                    transform: scale(1);
                    pointer-events: auto;
                    z-index: 2;
                }

                .metrics-carousel .splide__track:has(.splide__slide:hover) .splide__slide:hover .card-wrapper .collapsed-content {
                    opacity: 0;
                    transform: scale(0.98);
                    pointer-events: none;
                    z-index: 1;
                }

                /* Smooth crossfade transitions */
                .metrics-carousel .card-wrapper .expanded-content,
                .metrics-carousel .card-wrapper .collapsed-content {
                    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                                transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </section>
    );
};

export default Metrics;
