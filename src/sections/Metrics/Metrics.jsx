import { useState } from 'react';
import Container from '../../components/layout/Container';
import { siteContent } from '../../constants/content';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
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


const MetricCard = ({
        study,
        index,
        expandedCard,
        setExpandedCard,
        isMobile = false,
    }) => {
        const isExpanded = isMobile || expandedCard === index;
  
    return (
      <div
        onMouseEnter={!isMobile ? () => setExpandedCard(index) : undefined}
        onMouseLeave={!isMobile ? () => setExpandedCard(0) : undefined}
        className="relative rounded-md border border-[#747474] bg-white shrink-0 overflow-hidden p-2 flex flex-row transition-[width] duration-700 ease-in-out h-55 lg:h-55"
        style={{
          width: isMobile ? '100%' : isExpanded ? '450px' : '220px',
        }}
      >
        {/* Image */}
        <div
          className="relative rounded-sm overflow-hidden shrink-0 transition-[width] duration-700 ease-in-out"
          style={{
            width: isMobile ? '144px' : isExpanded ? '144px' : '100%',
          }}
        >
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover"
          />
  
          {/* Overlay (desktop collapsed only) */}
          {!isMobile && (
            <div
              className="absolute top-0 right-0 bottom-0 left-1/2 bg-white/80 backdrop-blur-md p-3 flex flex-col transition-opacity duration-500"
              style={{ opacity: isExpanded ? 0 : 1 }}
            >
              <h3 className="text-sm uppercase">{study.stat}</h3>
              <h3 className="text-sm uppercase mt-1">{study.title}</h3>
            </div>
          )}
        </div>
  
        {/* Content */}
        <div
            className="flex-1 flex flex-col justify-between pl-5 transition-all duration-700"
            style={{
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? 'translateX(0)' : 'translateX(20px)',
            }}
        >
          <div>
            <h3 className="
                uppercase
                text-lg
                sm:text-xl
                lg:text-2xl
            ">
                {study.stat} {study.title}
            </h3>
            <p className="
                mt-2
                text-sm
                sm:text-base
                leading-snug
                lg:leading-[140%]
            ">
                {study.description}
            </p>
          </div>
  
          <a className="mt-3 text-sm font-semibold flex items-center gap-1.5">
            Read more →
          </a>
        </div>
      </div>
    );
};
  
const Metrics = () => {
    const { metrics } = siteContent;
    const [expandedCard, setExpandedCard] = useState(0);


    const [emblaRef] = useEmblaCarousel(
        { 
            align: 'start',
            loop: false,
            dragFree: true,
        },
        [Autoplay({ delay: 3500, stopOnInteraction: true })]
    );
      
    return (
        <section id="about" className="py-16 lg:py-24 bg-white w-full">
            <Container className="px-4">
                {/* Headline */}
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="mx-auto max-w-2xl text-2xl lg:text-[32px] font-bold leading-snug lg:leading-tight text-center text-[#131212]">
                        {metrics.headline}{' '}
                        <span className="text-[#F5614D]">{metrics.highlightedText}</span>
                    </h2>
                </div>

                <div className="relative max-w-7xl mx-auto mask-fade-x flex-[0_0_90%] px-1" style={{ '--fade': '15px' }}>
                    {/* Mobile carousel */}
                    <div ref={emblaRef} className="overflow-hidden lg:hidden">
                        <div className="flex gap-4">
                            {caseStudies.map((study, index) => (
                            <div key={index} className="flex-[0_0_90%]">
                                <MetricCard study={study} isMobile />
                            </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop layout (unchanged) */}
                    <div className="hidden lg:flex justify-center gap-5">
                        {caseStudies.map((study, index) => (
                            <MetricCard
                            key={index}
                            study={study}
                            index={index}
                            expandedCard={expandedCard}
                            setExpandedCard={setExpandedCard}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Metrics;
