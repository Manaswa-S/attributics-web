import { siteContent } from '../../constants/content';

const About = () => {
    const { about } = siteContent;

    return (
        <section id="about" className="py-16 lg:py-24 bg-white">
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
                        <div className="w-[473px] h-[468px]">
                            <div className="w-full h-full bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
                                <span className="text-[20px] font-normal leading-[140%] text-[#131313]"
                                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                    Team image
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Catchy Statement Section */}
                <div className="relative w-full max-w-[1440px] mx-auto text-center mb-24 px-[163px]">
                    <h3 className="text-[32px] lg:text-[40px] font-normal leading-[140%] text-black italic max-w-[900px] mx-auto"
                        style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                        "{about.statement}"
                    </h3>
                </div>

                {/* Mission & Vision Section */}
                <div className="relative w-full max-w-[1440px] mx-auto px-[163px] mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[100px] items-start">
                        {/* Left Image - 470px × 468px */}
                        <div className="w-full max-w-[470px] h-[468px]">
                            <div className="w-full h-full bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
                                <span className="text-[20px] font-normal leading-[140%] text-[#131313]"
                                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                    Team Image
                                </span>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="w-full flex flex-col items-start gap-[20px]">
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
        </section>
    );
};

export default About;
