import Block from '../../../components/layout/Block/Block';
import { agentic } from '../../../constants/home';
// experimental
import BetterL from './BetterL';

const Agentic = () => {
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
                            <p className='section-eyebrow'>{agentic.eyebrow}</p>
                            <h2 className='section-title' style={{fontSize: '2.8rem'}}>
                                {agentic.headline}
                                <br />
                                <span className="highlight">{agentic.highlighted}</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </Block>
    );
};

export default Agentic;