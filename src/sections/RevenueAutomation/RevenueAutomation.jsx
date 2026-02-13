import Block from '../../components/layout/Block/Block';
import useEmblaCarousel from 'embla-carousel-react';
import WheelGestures from 'embla-carousel-wheel-gestures'

// Assets
import cardBg01 from '../../assets/revAuto/1.webp';
import cardBg02 from '../../assets/revAuto/2.webp';
import cardBg03 from '../../assets/revAuto/3.webp';

const caseStudies = [
    {
        id: 1,
        image: cardBg01,
        title: "DRIVING DIGITAL TRANSFORMATION WITH MARTECH",
        description: "A leading automobile manufacturer in India partnered with us to establish a Customer 360 view, streamline marketing touchpoints, and enhance digital sales performance.",
    },
    {
        id: 2,
        image: cardBg02,
        title: "TRANSITION TO A COMPOSABLE CDP",
        description: "A major automobile manufacturer in Indonesia transitioned to a cloud-based CDP, improving scalability, reducing costs, and enabling developer-level personalization.",
    },
    {
        id: 3,
        image: cardBg03,
        title: "BOOSTING LEAD CONVERSIONS WITH DATA & CRM",
        description: "A large life insurance provider used AI-powered lead scoring and CRM workflows to reduce duplication, improve conversions, and unlock new revenue streams.",
    },
    {
        id: 4,
        image: cardBg01,
        title: "BOOSTING DATA CONVERSIONS",
        description: "A large retailer revolutionized their data strategy to improve customer engagement and maximize revenue.",
    },
    {
        id: 5,
        image: cardBg02,
        title: "ACCELERATING CUSTOMER ENGAGEMENT",
        description: "A Fortune 500 company implemented intelligent automation to deliver personalized experiences at scale, increasing customer lifetime value by 40%.",
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
                <h3
                    className="text-white uppercase text-[24px] leading-[100%]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400 }}
                >
                    {study.title}
                </h3>

                <p
                    className="text-white text-[16px] leading-[140%]"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}
                >
                    {study.description}
                </p>
            </div>

            <a
                href="#"
                className="relative z-10 text-white text-[16px] leading-[140%] inline-flex items-center gap-2 hover:opacity-80 transition-opacity mt-7.5"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}
            >
                Read more →
            </a>
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
                <p className="uppercase text-[16px] leading-[100%] tracking-[0%] text-gray-500 mb-4"
                    style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 400,
                        maxWidth: '605.5px'
                    }}
                >
                    YOUR PLAYBOOK FOR RETENTION
                </p>
                <h2
                    className="text-[32px] font-normal text-[#000000] leading-[130%]"
                    style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        maxWidth: '605.5px'
                    }}
                >
                    From Manual Campaigns to Intelligent Revenue Automation
                </h2>
            </div>

            {/* Case Study Cards - scrollable within Container boundary */}
            <div
                ref={emblaRef}
                className={`${isMobile ? '' : 'mask-fade-x'} flex-[6] h-full overflow-hidden`}
                style={{ '--fade': '15px' }}
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