import Block from "../../components/layout/Block";
import {culture} from "../../constants/careers";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll';
import { typography } from "../../constants/global";
import Orbit from "./Orbit";


const Culture = () => {
    return (
        <>
            <Block xpad="none" topMargin="none">
            {/* Teams/Culture Section */}
            <section className="w-full h-full">
                <div className="text-center mb-16">
                    <h2
                        className="section-title mb-4"
                        style={typography.title.XXL}
                    >
                        {culture.title}{' '}<span className="highlight">{culture.highlighted}</span>
                    </h2>
                    <p
                        className="section-description max-w-2xl mx-auto"
                        style={typography.desc.Normal}
                    >
                        {culture.description}
                    </p>
                </div>

                <div className="flex xl:hidden">
                    <Carousel  imgs={culture.carouselImgs} />
                </div>
                <div className="hidden xl:flex">
                    <Orbit  imgs={culture.carouselImgs} />
                </div>
            </section>
            </Block>
        </>
    );
};

function Carousel({imgs}) {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: 'center', dragFree: true },
        [AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: true, startDelay: 10 })]
    );

    return (
        <div className="relative w-full flex overflow-hidden group">
        <div
            ref={emblaRef}
            className="embla mask-fade-x"
            style={{ "--fade": "12px" }}
        >
        <div className="embla__container items-center">
        {imgs.map((img, idx) => (
            <div 
                key={idx}
                className="mr-6 relative rounded-2xl overflow-hidden h-100 w-[380px] md:w-[500px] flex-shrink-0"
            >
                <img src={img} alt="TEAM IMAGE" className="w-full h-full object-cover" />
            </div>
        ))}
        </div>
        </div>
    </div>
    );
}

export default Culture;
