import Block from '../../../components/layout/Block/Block';
import useEmblaCarousel from 'embla-carousel-react';
import WheelGestures from 'embla-carousel-wheel-gestures'
import { revenueAutomation } from '../../../constants/home';

const CaseStudyCard = ({ study }) => {
    return (
        <div
            key={study.id}
            className="
                embla__slide shrink-0
                w-85
                rounded-[10px]
                p-7.5
                flex flex-col justify-between
                relative overflow-hidden
            "
        >
            {/* Background Image */}
            <img
                src={study.image}
                alt={study.title}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gray-900/35" />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-7.5">
                <h3 className='content-title'>{study.title}</h3>
                <p className='content-description'>{study.description}</p>
            </div>

            <div className='relative z-10 mt-8'>
                <a href={study.readMore}
                    className='content-description'>
                    Read more →
                </a>
            </div>
        </div>

    );
};

const RevenueAutomation = () => {
    const [emblaRef] = useEmblaCarousel(
        { 
            align: 'start',
            loop: false,
            dragFree: true,
        },
        [
            WheelGestures({ forceWheelAxis: 'x', wheelSpeed: 0.6 }),
        ]
    );
    const isMobile = window.innerWidth < 1024;

    return (
        <Block height='75vh' xpad='large'>
        <section className="overflow-hidden w-full h-full flex flex-col">
            {/* Section Header - Inside Container */}
            <div className="flex-[4] w-full py-8 flex flex-col justify-center items-start">
                <p className='section-eyebrow'>{revenueAutomation.eyebrow}</p>
                <h2 className='section-title'>
                    {revenueAutomation.headline}
                    <br />
                    <span className="highlight">{revenueAutomation.highlighted}</span>
                </h2>
            </div>

            {/* Case Study Cards - scrollable within Container boundary */}
            <div
                ref={emblaRef}
                className={`${isMobile ? '' : 'mask-fade-x'} flex-[6] h-full overflow-hidden`}
                style={{ '--fade': '10px' }}
            >
                <div className="flex gap-6.75 embla__container h-full">
                    {revenueAutomation.caseStudies.map((study) => (
                        <CaseStudyCard key={study.id} study={study} />
                    ))}
                </div>
            </div>
        </section>
        </Block>
    );
};

export default RevenueAutomation;