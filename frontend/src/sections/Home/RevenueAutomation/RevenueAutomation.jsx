import Block from '../../../components/layout/Block/Block';
import useEmblaCarousel from 'embla-carousel-react';
import WheelGestures from 'embla-carousel-wheel-gestures'

// Assets
import cardBg01 from '../../../assets/revAuto/1.webp';
import cardBg02 from '../../../assets/revAuto/2.webp';
import cardBg03 from '../../../assets/revAuto/3.webp';

const caseStudies = [
    {
        id: 1,
        image: cardBg01,
        title: "DRIVING DIGITAL TRANSFORMATION WITH MARTECH",
        description: "A leading automobile manufacturer in India partnered with us to establish a Customer 360 view, streamline marketing touchpoints, and enhance digital sales performance.",
        readMore: "#"
    },
    {
        id: 2,
        image: cardBg02,
        title: "TRANSITION TO A COMPOSABLE CDP",
        description: "A major automobile manufacturer in Indonesia transitioned to a cloud-based CDP, improving scalability, reducing costs, and enabling developer-level personalization.",
        readMore: "#"
    },
    {
        id: 3,
        image: cardBg03,
        title: "BOOSTING LEAD CONVERSIONS WITH DATA & CRM",
        description: "A large life insurance provider used AI-powered lead scoring and CRM workflows to reduce duplication, improve conversions, and unlock new revenue streams.",
        readMore: "#"
    },
    {
        id: 4,
        image: cardBg01,
        title: "BOOSTING DATA CONVERSIONS",
        description: "A large retailer revolutionized their data strategy to improve customer engagement and maximize revenue.",
        readMore: "#"
    },
    {
        id: 5,
        image: cardBg02,
        title: "ACCELERATING CUSTOMER ENGAGEMENT",
        description: "A Fortune 500 company implemented intelligent automation to deliver personalized experiences at scale, increasing customer lifetime value by 40%.",
        readMore: "#"
    }
];

// CaseStudyCard Component
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
        <Block height='75vh' xpad='15%'>
        <section className="overflow-hidden w-full h-full flex flex-col">
            {/* Section Header - Inside Container */}
            <div className="flex-[4] w-full py-8 flex flex-col justify-center items-start">
                <p className='section-eyebrow'>YOUR PLAYBOOK FOR RETENTION</p>
                <h2 className='section-title'>
                    From Manual Campaigns To
                    <br />
                    <span className="highlight">Intelligent Revenue Automation</span>
                </h2>
            </div>

            {/* Case Study Cards - scrollable within Container boundary */}
            <div
                ref={emblaRef}
                className={`${isMobile ? '' : 'mask-fade-x'} flex-[6] h-full overflow-hidden`}
                style={{ '--fade': '10px' }}
            >
                <div className="flex gap-6.75 embla__container h-full">
                    {caseStudies.map((study) => (
                        <CaseStudyCard key={study.id} study={study} />
                    ))}
                </div>
            </div>
        </section>
        </Block>
    );
};

export default RevenueAutomation;