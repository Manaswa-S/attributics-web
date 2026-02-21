import Block from '../../../components/layout/Block/Block';
import Backdrop from '../../../components/Backdrop/Backdrop';
// experimental
import BetterL from './BetterL';

const Features = () => {
    return (
        <Block minHeight="60vh">
            <section className="relative w-full h-full overflow-hidden flex flex-col justify-center items-center py-14" style={{backgroundColor: ''}}>
                {/* Background Section */}
                <div className="absolute inset-0">
                    {/* <Backdrop /> */}
                </div>

                <div className="relative w-full">
                    <div className='w-full'>
                        <BetterL />
                    </div>

                    {/* Overlap Layer */}
                    <div className="absolute top-0 left-[38%] -translate-x-full flex items-start justify-start py-20 pointer-events-none">
                        <div className="text-left">
                            <p className='section-eyebrow'>
                                Agentic AI at work
                            </p>
                            <h2 className='section-title' style={{fontSize: '2.8rem'}}>
                                From Engagement
                                <br />
                                <span className="highlight">To Life Time Value</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </Block>
    );
};

export default Features;
