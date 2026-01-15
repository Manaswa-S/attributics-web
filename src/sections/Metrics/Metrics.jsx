import Container from '../../components/layout/Container';
import { siteContent } from '../../constants/content';
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
];

const Metrics = () => {
    const { metrics } = siteContent;

    return (
        <section id="about" className="py-16 lg:py-24">
            <Container>
                {/* Headline */}
                <div className="text-center mb-10 lg:mb-16">
                    <h2 className="mx-auto max-w-full lg:max-w-[552px] font-noto text-2xl lg:text-[30px] font-medium leading-[140%] tracking-normal text-center text-[#131212]">
                        {metrics.headline}{' '}
                        <span className="text-blue-600">{metrics.highlightedText}</span>
                    </h2>
                </div>

                {/* Case Study Cards */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-[20px]">
                    {caseStudies.map((study, index) => (
                        <div
                            key={index}
                            className="relative w-full max-w-[400px] h-[223px] rounded-[16px] overflow-hidden group cursor-pointer"
                        >
                            {/* Background Image */}
                            <img
                                src={study.image}
                                alt={study.title}
                                className="absolute inset-0 w-full h-full object-cover blur-[1px] transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                {/* Top Content */}
                                <div>
                                    <h3 className="font-mono text-white text-lg tracking-wider">
                                        {study.stat}
                                    </h3>
                                    <h3 className="font-mono text-white text-lg tracking-wider">
                                        {study.title}
                                    </h3>
                                    <p className="text-white/80 text-sm mt-4 max-w-[280px]">
                                        {study.description}
                                    </p>
                                </div>

                                {/* Read More Link */}
                                <a
                                    href="#"
                                    className="text-white text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all"
                                >
                                    Read more <span>→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Metrics;
