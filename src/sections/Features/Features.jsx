import Container from '../../components/layout/Container';
import { siteContent } from '../../constants/content';

const featureCards = [
    {
        color: 'bg-blue-500',
        title: 'THE COORDINATION CHALLENGE',
        description: 'Manual campaigns with fragmented data and high operational costs. Manual campaigns with fragmented data and high operational costs.',
    },
    {
        color: 'bg-yellow-500',
        title: 'THE SCALE PROBLEM',
        description: 'Static journeys and broad segments that miss individual context. Static journeys and broad segments that miss individual context',
    },
    {
        color: 'bg-green-500',
        title: 'THE GOVERNANCE GAP',
        description: 'No oversight on AI decisions, leading to risk and lack of accountability. No oversight on AI decisions, leading to risk and lack of accountability',
    },
];

const Features = () => {
    const { features } = siteContent;

    return (
        <section className="py-12 lg:py-24">
            <Container>
                {/* Eyebrow */}
                <div className="text-center mb-6">
                    <span className="font-mono text-sm lg:text-[16px] font-normal uppercase leading-[100%] tracking-normal text-[#131212]">
                        MARKETING TEAMS ARE STUCK BETWEEN TWO WORLDS
                    </span>
                </div>

                {/* Headline */}
                <div className="text-center mb-10 lg:mb-16">
                    <h2 className="mx-auto max-w-full lg:max-w-[601px] font-noto text-2xl lg:text-[30px] font-medium leading-[140%] tracking-normal text-center text-[#373232]">
                        What if your marketing stack could think, decide, and act -- all on its own?
                    </h2>
                </div>

                {/* Feature Cards */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-[20px]">
                    {featureCards.map((card, index) => (
                        <div
                            key={index}
                            className="w-full max-w-[397px] bg-white rounded-[6px] border border-gray-200 p-[20px]"
                        >
                            {/* Title with color indicator */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className={`w-3 h-3 ${card.color} rounded-sm`}></div>
                                <span className="font-mono text-xs lg:text-[12px] font-normal uppercase tracking-wider text-[#131212]">
                                    {card.title}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-sm lg:text-[14px] leading-relaxed text-gray-700">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Features;
