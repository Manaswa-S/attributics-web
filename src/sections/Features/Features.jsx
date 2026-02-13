import Block from '../../components/layout/Block/Block';
import graphImage from '../../assets/features/Group137.png';
import unionPattern from '../../assets/Union.svg';

const Features = () => {
    return (
        <Block height="60vh">
            <section className="relative w-full overflow-hidden flex flex-col justify-center items-center py-12 lg:py-16">
                {/* Background Section */}
                <div className="absolute inset-0">
                    {/* Base dot pattern using SVG */}
                    <img
                        src={unionPattern}
                        alt="Dotted Gradient Pattern"
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                    {/* Gradient overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0) 60%)',
                        }}
                    />
                </div>

                {/* Graph Section */}
                <div className="relative z-10">
                    <img
                        style={{
                            transform: 'scaleX(1.1)',
                            transformOrigin: 'center'
                        }}
                        src={graphImage}
                        alt="Graph"
                        className="w-full h-auto object-contain"
                    />

                    {/* Overlap Layer */}
                    <div className="absolute inset-0 flex items-start justify-start px-2 py-20  pointer-events-none">
                        <div className="text-left">
                            <p
                                style={{
                                    fontFamily: 'IBM Plex Sans',
                                    fontWeight: '400',
                                    fontStyle: 'Regular',
                                    fontSize: '16px',
                                    lineHeight: '130%',
                                    letterSpacing: '0%',
                                    textTransform: 'uppercase'
                                }}>
                                Agentic AI at work
                            </p>
                            <p style={{
                                font: 'noto sans',
                                fontWeight: '500',
                                fontStyle: 'Medium',
                                fontSize: '35px',
                                lineHeight: '140%',
                                letterSpacing: '0%',
                            }}>
                                From Engagement <br/>
                                To Life Time Value
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Block>
    );
};

export default Features;
