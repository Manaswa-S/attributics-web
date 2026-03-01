import React, { useMemo } from 'react';
import Block from '../../../components/layout/Block';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button/Button';
import { careers } from '../../../constants/careers';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { motion } from 'motion/react';

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
    <Block xpad='none'>
        <div
            className="min-h-screen flex flex-col pt-24 sm:pt-28 lg:pt-32"
            style={{
                background: "linear-gradient(to top, rgb(255,255,255) 0%, rgba(173,173,173,0.4) 10%, rgba(129,129,129,0.4) 13%, rgb(255,255,255) 35%, rgb(255,255,255) 100%)"
            }}
        >
            {/* Header */}
            <motion.div
                className="text-center px-5 sm:px-8 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.p
                    className="section-eyebrow mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {careers.eyebrow}
                </motion.p>

                <motion.h1
                    className="section-title mx-auto mb-3 sm:mb-4"
                    style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                        fontWeight: 600,
                        lineHeight: 1.2,
                        maxWidth: 'min(90%, 600px)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {careers.headline[0]}{' '}
                    <span className="highlight">{careers.highlighted}</span>
                    {' '}{careers.headline[1]}
                </motion.h1>

                <motion.p
                    className="section-description mx-auto mb-6"
                    style={{
                        fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                        maxWidth: 'min(90%, 560px)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {careers.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link to="/contact?type=career">
                        <Button>
                            {careers.buttonLabel}{' '}
                            <span className="text-lg">→</span>
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Carousel */}
            <motion.div
                className="flex-1 flex items-end sm:items-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
                <CarouselImgs />
            </motion.div>
        </div>
    </Block>
);

// ─── Carousel ─────────────────────────────────────────────────────────────────
const CarouselImgs = () => {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: 'start', dragFree: true },
        [AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: false })]
    );

    const imagesWithTilt = useMemo(() =>
        careers.carouselImgs.map((src, index) => ({
            id: index,
            src,
            tilt: Math.random() * 10 - 5, // –5 to +5 deg
        }))
    , []);

    return (
        <div className="w-full overflow-hidden py-10 sm:py-14 lg:py-20" ref={emblaRef}>
            <div className="flex">
                {imagesWithTilt.map((image, index) => (
                    <motion.div
                        key={image.id}
                        className="
                            shrink-0
                            w-[80vw]
                            sm:w-[55vw]
                            md:w-[40vw]
                            lg:w-[32vw]
                            xl:w-[28vw]
                            px-3 sm:px-4 lg:px-5
                            flex items-center
                        "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.08 }}
                    >
                        <div style={{ transform: `rotate(${image.tilt}deg)` }} className="w-full">
                            <img
                                src={image.src}
                                loading="eager"
                                className="rounded-2xl sm:rounded-3xl w-full h-auto object-cover shadow-2xl shadow-black/15"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Hero;