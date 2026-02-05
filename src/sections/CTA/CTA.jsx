import Container from '../../components/layout/Container';
import { siteContent } from '../../constants/content';

const CTA = () => {
    const { cta } = siteContent;

    return (
        <section className="py-16 lg:py-24 bg-white">
            <Container>
                <div className="bg-[#F8F8F8] rounded-[20px] p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    <div className="flex-1">
                        <p className="text-[12px] font-mono uppercase tracking-wider text-[#999] mb-3">
                            {cta.badge}
                        </p>
                        <h2 className="text-[28px] lg:text-[36px] font-normal leading-[130%] text-[#131212]">
                            {cta.headline}
                        </h2>
                    </div>
                    <div className="flex-shrink-0">
                        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 h-[48px] bg-[#131212] text-white text-[14px] font-medium rounded-[6px] hover:bg-[#333] transition-colors whitespace-nowrap">
                            <span>{cta.buttonText}</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CTA;
