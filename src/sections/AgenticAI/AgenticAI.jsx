import Container from '../../components/layout/Container';
import backgroundImage from '../../assets/images/background_image.jpg';
import excludeIcon from '../../assets/logo/Exclude.svg';

// Data-driven flow cards - easily add/modify content here
const flowCards = [
    {
        label: 'THINKING',
        headline: 'Know what your customers will do next.',
        description: 'Our AI reads behavioral signals in real-time to predict churn risk, identify upsell opportunities, and trigger the right action before the moment passes.',
    },
    {
        label: 'ANALYSIS',
        headline: 'AI that builds your strategy, then executes it.',
        description: 'From business goal to live campaign in minutes—our AI generates multi-channel plans, recommends the next best action for every customer, and optimizes in real-time as results come in.',
    },
    {
        label: 'ACTION',
        headline: "Set your Goals. We'll handle the rest.",
        description: 'Our AI autonomously launches personalized campaigns, optimizes them in real-time for maximum ROI, and gets smarter with every interaction—all through your existing marketing stack.',
    },

];

const AgenticAI = () => {
    return (
        <section id="products" className="relative py-24 lg:py-32 overflow-hidden min-h-[900px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover blur-[2px]"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Large Background Text */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <h2 className="text-[120px] lg:text-[180px] font-bold text-white/10 whitespace-nowrap select-none">
                    Agentic AI at work
                </h2>
            </div>

            <Container className="relative z-10">
                {/* Header */}
                <div className="text-center mb-10 lg:mb-16">
                    <span className="font-mono text-xs lg:text-[14px] font-normal uppercase tracking-wider text-white/80 mb-3 lg:mb-4 block">
                        MEET YOUR AUTONOMOUS RETENTION ENGINE
                    </span>
                    <p className="mx-auto max-w-full lg:max-w-[520px] text-sm lg:text-[16px] leading-relaxed text-white/90">
                        Attonomous works with your existing MarTech stack to automate workflows, deliver real-time insights, and enable hyper-personalized campaigns at scale.
                    </p>
                </div>

                {/* Icon at top of flow */}
                <div className="flex justify-center mb-6 lg:mb-8">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <img src={excludeIcon} alt="Icon" className="w-6 h-6 lg:w-7 lg:h-7" />
                    </div>
                </div>

                {/* Vertical Flow Timeline */}
                <div className="w-full max-w-[531px] mx-auto min-h-[auto] lg:min-h-[1021px]">
                    <div className="relative">
                        {/* Flow Cards */}
                        <div className="space-y-6 lg:space-y-8">
                            {flowCards.map((card, index) => (
                                <div key={index} className="relative">
                                    {/* Connection Line (except for last item) */}
                                    {index !== flowCards.length - 1 && (
                                        <div className="absolute left-1/2 -top-4 -bottom-6 lg:-bottom-8 w-[2px] bg-white/30 -translate-x-1/2 -z-10"></div>
                                    )}

                                    {/* Connection dot */}
                                    <div className="absolute left-1/2 -top-4 w-3 h-3 bg-white rounded-full -translate-x-1/2 z-10"></div>

                                    {/* Card */}
                                    <div className="w-full min-h-[auto] lg:min-h-[229px] rounded-[14px] border border-[#C5C5C5] p-6 lg:p-8 backdrop-blur-[15px] bg-white/80 transition-transform hover:scale-[1.02] duration-300">
                                        <span className="font-mono text-[10px] lg:text-[11px] font-normal uppercase tracking-wider text-[#131212]/60 mb-2 lg:mb-4 block">
                                            {card.label}
                                        </span>
                                        <h3 className="text-lg lg:text-[20px] font-semibold text-[#131212] mb-2 lg:mb-4 leading-tight">
                                            {card.headline}
                                        </h3>
                                        <p className="text-sm lg:text-[14px] leading-relaxed text-[#131212]/80">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AgenticAI;
