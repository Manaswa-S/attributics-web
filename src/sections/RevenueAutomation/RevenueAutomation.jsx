import { useState, useEffect } from 'react';
import Container from '../../components/layout/Container';
import bottomImg from '../../assets/logo/bottom.png';
import topImg from '../../assets/logo/hero_imagejpg.jpg';

const slides = [
    {
        id: 1,
        // Top Left Content
        topTag: "YOUR PLAYBOOK FOR RETENTION",
        topHeadline: "From Manual Campaigns to Intelligent Revenue Automation",
        topDescription: "Replace reactive workflows, fragmented data, and high operational costs with AI-driven decisioning that maximizes LTV through real-time, 1:1 personalization at scale.",

        // Right Visual Content
        image: bottomImg, // Using the provided image
        itemColor: "bg-blue-50/30", // Optional background accent if needed

        // Bottom Q&A Content
        qaLabel: "HOW DO I CREATE A SINGLE CUSTOMER VIEW TO UNDERSTAND THEIR PREFERENCES, NEEDS, AND BEHAVIORS BETTER?",
        qaHeadline: "Integrate data from all touchpoints, and create a 360° customer profile for personalized insights."
    },
    {
        id: 2,
        topTag: "PREDICTIVE ANALYTICS",
        topHeadline: "Stop Churn Before It Happens",
        topDescription: "Identify at-risk customers with high precision using our predictive models. Intervene automatically with personalized offers that retain valuable users and protect revenue.",

        image: bottomImg, // Reusing bottomImg for now as placeholder for other slides, or user can add more
        itemColor: "bg-purple-50/30",

        qaLabel: "How can I predict which customers are likely to churn?",
        qaHeadline: "Leverage AI-driven predictive analytics to identify at-risk customers and engage them proactively."
    },
    {
        id: 3,
        topTag: "LIFETIME VALUE OPTIMIZATION",
        topHeadline: "Maximize Every Customer Relationship",
        topDescription: "Move beyond simple transactions. Understand the long-term value of your users and implement strategies that increase engagement, loyalty, and lifetime revenue.",

        image: topImg,
        itemColor: "bg-green-50/30",

        qaLabel: "What is the best way to increase customer lifetime value?",
        qaHeadline: "Deliver hyper-personalized experiences that resonate with individual preferences and drive repeat engagement."
    },
    {
        id: 4,
        topTag: "INTELLIGENT AUTOMATION",
        topHeadline: "Scale Personalization Without the Chaos",
        topDescription: "Automate complex marketing workflows. Deliver the right message to the right user at the right time, across all channels, without manual intervention.",

        image: bottomImg,
        itemColor: "bg-orange-50/30",

        qaLabel: "How do I automate marketing campaigns without losing the personal touch?",
        qaHeadline: "Use intelligent automation to scale your outreach while maintaining relevance and personalization for every user."
    },
    {
        id: 5,
        topTag: "REVENUE ATTRIBUTION",
        topHeadline: "Measure What Matters: ROI",
        topDescription: "Gain clear visibility into the impact of your retention efforts. Attribute revenue directly to specific campaigns and optimize your spend for maximum return on investment.",

        image: bottomImg,
        itemColor: "bg-red-50/30",

        qaLabel: "How can I measure the true impact of my retention strategies?",
        qaHeadline: "Track real-time performance metrics and attribute revenue directly to your retention efforts for clear ROI visibility."
    }
];

const RevenueAutomation = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(0);

    // Unified Auto-scroll
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, []);

    // Staggered Delay for Bottom Section
    useEffect(() => {
        const timer = setTimeout(() => {
            setBottomIndex(currentIndex);
        }, 1000); // 1 second delay

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        // Note: bottomIndex will automatically follow after 1s due to the useEffect above
    };

    return (
        <section id="solutions" className="py-12 lg:py-24 bg-white">
            <div className="mx-auto max-w-[1308px] px-4 sm:px-6 lg:px-8">
                {/* Main Playbook Card */}
                <div className="w-full rounded-[14px] border border-gray-200 bg-white overflow-hidden p-6 lg:p-[40px] flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center min-h-[auto] lg:min-h-[513px]">
                    {/* Left Content */}
                    <div className="flex-1 max-w-full lg:max-w-[605px] transition-all duration-500">
                        <div key={currentIndex} className="animate-fadeIn">
                            <span className="font-mono text-xs lg:text-[14px] font-normal uppercase tracking-wider text-[#131212] mb-4 lg:mb-6 block">
                                {slides[currentIndex].topTag}
                            </span>

                            <h2 className="font-noto text-3xl lg:text-[40px] leading-[1.2] font-medium text-[#18181B] mb-4 lg:mb-6 min-h-[auto] lg:min-h-[82px] transition-all duration-300">
                                {slides[currentIndex].topHeadline}
                            </h2>

                            <p className="text-sm lg:text-[16px] leading-relaxed text-[#52525B] min-h-[auto] lg:min-h-[72px] transition-all duration-300">
                                {slides[currentIndex].topDescription}
                            </p>
                        </div>

                        {/* Pagination Dots - Top Section */}
                        <div className="flex justify-center lg:justify-start gap-2 mt-6 lg:mt-8">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-[#18181B]' : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Image Area - Synced Visual */}
                    <div className={`flex-1 relative w-full h-[300px] lg:h-full lg:min-h-[300px] flex items-center justify-center rounded-xl transition-colors duration-700 ${slides[currentIndex].itemColor}`}>
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                            {/* Static Background or transitioning image */}
                            <img
                                key={currentIndex}
                                src={slides[currentIndex].image}
                                alt="Revenue Automation"
                                className="w-full h-full object-contain animate-fadeIn"
                            />

                            {/* Floating Button - Always visible - Centered */}
                            <button className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[202px] h-[53px] bg-[#18181B]/90 backdrop-blur-[4px] text-white rounded-[4px] border border-white/10 flex items-center justify-center gap-[6px] hover:bg-[#27272A] transition-all shadow-xl z-20">
                                <span className="text-sm font-medium">View case studies</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slider Card */}
                <div className="mt-4 lg:mt-[20px] w-full rounded-[14px] border border-gray-200 bg-white p-6 lg:p-[40px] min-h-[auto] lg:min-h-[305px] flex flex-col justify-between transition-all duration-500">
                    <div className="animate-fadeIn" key={bottomIndex}>
                        <span className="font-mono text-xs lg:text-[12px] font-normal uppercase tracking-wider text-[#52525B] mb-4 block h-auto lg:h-[18px]">
                            {slides[bottomIndex].qaLabel}
                        </span>

                        <h3 className="font-noto text-xl lg:text-[24px] leading-relaxed font-normal text-[#18181B] max-w-full lg:max-w-[800px] min-h-[auto] lg:min-h-[72px]">
                            {slides[bottomIndex].qaHeadline}
                        </h3>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-6 lg:mt-8">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-[#18181B]' : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Call to Action Banner */}
                <div className="mt-4 lg:mt-[20px] w-full rounded-[14px] border border-[#C5C5C5] bg-white p-6 lg:p-[40px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-[200px] min-h-[auto] lg:min-h-[176px]">
                    <div>
                        <span className="font-mono text-xs lg:text-[12px] font-normal uppercase tracking-wider text-[#52525B] mb-2 lg:mb-4 block">
                            READY TO GET STARTED?
                        </span>
                        <h3 className="font-noto text-xl lg:text-[24px] leading-relaxed font-normal text-[#18181B] max-w-full lg:max-w-[600px]">
                            Get a free audit for an intelligent layer for your martech stack.
                        </h3>
                    </div>

                    <button className="w-full lg:w-auto bg-[#18181B] text-white px-6 py-3 rounded-[4px] text-sm font-medium flex justify-center items-center gap-2 hover:bg-[#27272A] transition-colors whitespace-nowrap">
                        <span>Book an audit</span>
                        <span>→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RevenueAutomation;
