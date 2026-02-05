import Container from '../../components/layout/Container';

const caseStudies = [
    {
        id: 1,
        title: "DRIVING DIGITAL TRANSFORMATION WITH MARTECH",
        description: "A leading automobile manufacturer in India partnered with us to establish a Customer 360 view, streamline marketing touchpoints, and enhance digital sales performance.",
        gradient: "linear-gradient(135deg, #4A5568 0%, #8B5CF6 100%)"
    },
    {
        id: 2,
        title: "TRANSITION TO A COMPOSABLE CDP",
        description: "A major automobile manufacturer in Indonesia transitioned to a cloud-based CDP, improving scalability, reducing costs, and enabling developer-level personalization.",
        gradient: "linear-gradient(135deg, #94A3B8 0%, #C4B5FD 100%)"
    },
    {
        id: 3,
        title: "BOOSTING LEAD CONVERSIONS WITH DATA & CRM",
        description: "A large life insurance provider used AI-powered lead scoring and CRM workflows to reduce duplication, improve conversions, and unlock new revenue streams.",
        gradient: "linear-gradient(135deg, #64748B 0%, #10B981 100%)"
    },
    {
        id: 4,
        title: "BOOSTING DATA CONVERSIONS",
        description: "A large retailer revolutionized their data strategy to improve customer engagement and maximize revenue.",
        gradient: "linear-gradient(135deg, #6B7280 0%, #3B82F6 100%)"
    }
];

const RevenueAutomation = () => {
    return (
        <section id="solutions" className="py-12 lg:py-24 bg-white overflow-hidden">
            {/* Section Header - Inside Container */}
            <Container>
                <div className="mb-10">
                    <p
                        className="uppercase text-[16px] leading-[100%] tracking-[0%] text-gray-500 mb-4"
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
            </Container>

            {/* Case Study Cards - Full Width Carousel */}
            <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-[38px] pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8" style={{ width: 'max-content' }}>
                    {caseStudies.map((study) => (
                        <div
                            key={study.id}
                            className="flex-shrink-0 w-[341px] rounded-[10px] p-[30px] flex flex-col justify-between"
                            style={{
                                background: study.gradient,
                                minHeight: '367px'
                            }}
                        >
                            <div className="flex flex-col gap-[30px]">
                                {/* Card Title */}
                                <h3
                                    className="text-white uppercase text-[24px] leading-[100%]"
                                    style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400 }}
                                >
                                    {study.title}
                                </h3>

                                {/* Card Description */}
                                <p
                                    className="text-white text-[16px] leading-[140%]"
                                    style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}
                                >
                                    {study.description}
                                </p>
                            </div>

                            {/* Read More Link */}
                            <a
                                href="#"
                                className="text-white text-[16px] leading-[140%] inline-flex items-center gap-2 hover:opacity-80 transition-opacity mt-[30px]"
                                style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}
                            >
                                Read more →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RevenueAutomation;
