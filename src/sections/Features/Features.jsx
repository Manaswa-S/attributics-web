import Block from '../../components/layout/Block/Block';
import graphImage from '../../assets/features/Group137.png';
import unionPattern from '../../assets/Union.svg';

// experimental
import BetterL from './BetterL';

const Features = () => {
    return (
        <Block minHeight="60vh">
            <section className="relative w-full h-full overflow-hidden flex flex-col justify-center items-center py-14" style={{backgroundColor: ''}}>
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

                <div className="relative w-full">
                    <div className='w-full'>
                        <BetterL />
                    </div>

                    {/* Overlap Layer */}
                    <div className="absolute top-0 left-[35%] -translate-x-full flex items-start justify-start py-20 pointer-events-none">
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

                            <h2 className="mx-auto max-w-2xl text-2xl lg:text-[32px] font-bold leading-snug lg:leading-tight text-center text-[#131212]"
                                style={{font: 'noto sans', fontSize: '35px', fontWeight: 500, fontStyle: 'medium', lineHeight: '140%', letterSpacing: '0%'}}>
                                From Engagement
                                <br />
                                <span className="text-[#F5614D]">To Life Time Value</span>
                            </h2>
{/*                             
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
                            </p> */}
                        </div>
                    </div>

                </div>
            </section>
        </Block>
    );
};

export default Features;
