import Block from "../../../components/layout/Block";
import { getstarted } from "../../../constants/about";
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
const GetStarted = () => {
    return (
        <Block xpad='large'>
            <AuditCTA />
        </Block>
    )
};

const withBackdrop = () => {
    return (
        <>
            <Block xpad='large'>
                <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-xl">
                    {/* Background Mask */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <Backdrop />
                    </div>
                    <div
                            className="
                                mt-30
                                mb-15
                                relative z-10
                                w-[100%]
                                max-w-5xl
                                flex flex-col
                                gap-10
                                p-8 lg:p-12
                                rounded-xl
                            "
                            style={{
                                background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.1) 105%)', 
                                backdropFilter: 'blur(30px)',
                                WebkitBackdropFilter: 'blur(30px)',
                            }}
                        >
                        <AuditCTA />
                    </div>
                </div>
            </Block>
        </>
    )
}

const AuditCTA = () => {
    return (
        <section className="w-full">
            <div
                className="
                
                border
                border-[#CFCFCF]
                rounded-[24px]
                px-6
                py-8
                lg:px-16
                lg:py-14

                flex
                flex-col
                gap-6
                items-center
                text-center
            "
            >
                {/* Left Content */}
                <div className="max-w-3xl">
                    <p className="section-eyebrow mb-4">{getstarted.eyebrow}</p>
                    <h2 className="section-title mb-4" style={{fontSize: '3rem'}}>
                        {getstarted.headline[0]}{' '}
                        <span className="highlight">{getstarted.highlighted}</span>{' '}
                        {getstarted.headline[1]}
                    </h2>
                    <h3 className="section-description">
                        {getstarted.description}
                    </h3>
                </div>

                {/* CTA Button */}
                <div className="flex-shrink-0">
                    <Link to="/contact">
                        <Button
                            variant="primary"
                            className="text-white bg-black header-button-label rounded-lg"
                        >
                            {getstarted.ctaText}
                            <span className="text-xl">→</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GetStarted;