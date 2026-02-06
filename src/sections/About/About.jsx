import { siteContent } from '../../constants/content';
import { getGroupPhotos } from './constants';
import unionPattern from '../../assets/Union.svg';
import { Container } from '../../components';

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

    return (
        <section id="about" className="py-16 lg:py-24 bg-white mt-10">
            {/* About Section */}
            <div className="relative w-full max-w-[1440px] mx-auto px-[163px]">
                {/* Who Are We Section - Group 99: 1113px × 468px */}
                <div className="relative w-full max-w-[1113px] h-[468px] mb-24">
                    {/* Grid Layout for Side-by-Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[128px] items-start h-full">

                        {/* Left Content - 512px wide */}
                        <div className="w-[512px] flex flex-col items-start gap-[13px] pt-[68px]">
                            <p className="w-[512px] h-[21px] text-[16px] font-normal leading-[130%] uppercase text-black"
                                style={{ fontFamily: 'IBM Plex Sans, sans-serif', letterSpacing: '0%' }}>
                                WHO ARE WE
                            </p>
                            <h2 className="w-[447px] h-[140px] text-[50px] font-medium leading-[140%] text-black"
                                style={{ fontFamily: 'Noto Sans, sans-serif', letterSpacing: '0%' }}>
                                {about.whoAreWe.headline}
                            </h2>
                            <p className="w-[512px] h-[112px] text-[20px] font-normal leading-[140%] text-[#131313]"
                                style={{ fontFamily: 'IBM Plex Sans, sans-serif', letterSpacing: '0%' }}>
                                {about.whoAreWe.description}
                            </p>
                        </div>

                        {/* Right Image - 473px × 468px */}
                        <div className="w-[473px] h-[468px] items-end">
                            <div className="w-full h-full bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
                                <img src={getGroupPhotos('1')} alt="Group Photo" className="w-full h-full object-cover rounded-[10px]" loading='lazy' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Catchy Statement Section */}
                <div className="relative w-[1105px] min-h-[210px] w-full max-w-[1440px] text-center mb-24">
                    <h3 className="text-[32px] lg:text-[40px] font-normal leading-[140%] text-black italic max-w-[900px] mx-auto"
                        style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                        "{about.statement}"
                    </h3>
                </div>

                {/* Who Are We Section - Group 99: 1113px × 468px */}
                <div className="relative w-full max-w-[1113px] h-[468px]">
                    {/* Grid Layout for Side-by-Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[128px] items-start h-full">
                        {/* Left Image - 473px × 468px */}
                        <div className="w-[473px] h-[468px] ">
                            <div className="w-full h-full bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
                                <img src={getGroupPhotos('2')} alt="Group Photo" className="w-full h-full object-cover rounded-[10px]" loading='lazy' />
                            </div>
                        </div>
                        {/* Right Content - 512px wide */}
                        <div className="w-[512px] flex flex-col items-start gap-[13px] pt-[68px]">
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
             <div className="mx-auto px-[44px] relative w-full h-[600px] lg:h-[539px] overflow-hidden mb-8 lg:mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
                    <div className="relative w-full h-[271px] top-[204px]
                                    pt-[40px] pr-[50px] pb-[40px] pl-[50px]
                                    border bg-white rounded-[20px] shadow-lg
                                    flex items-center">
                        <div className='flex items-center justify-between w-full'>
                            {metricCards.map((card, index) => (
                                <div
                                    key={index}
                                    className="w-[146px] h-[130px] flex flex-col items-center justify-center text-center"
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
                                        {card.metric}
                                        {card.unit}
                                    </p>

                                    {/* <div className="flex items-end">
                                          <span className="ml-1 text-[32px] font-mono">{card.unit}</span>
                                    </div> */}

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
