import Block from '../../../components/layout/Block';
import { partners } from '../../../constants/home';
import { motion } from 'motion/react';

// ─── Shared easing + duration ─────────────────────────────────────────────────
// One curve used everywhere so all elements feel like they belong together.
const EASE = [0.22, 1, 0.36, 1];
const DUR  = 0.65;

// Reusable fade-up factory — delay is the only variable
const fadeUp = (delay = 0) => ({
    initial:     { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, amount: 0.25 },
    transition:  { duration: DUR, ease: EASE, delay },
});

// ─── Partners ─────────────────────────────────────────────────────────────────
const Partners = () => {
    return (
        <Block xpad='none'>
            <section className="relative flex w-full h-full justify-between lg:flex-row flex-col overflow-auto">

                {/* Grid background */}
                <div
                    className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
                    style={{
                        height: '100%',
                        backgroundColor: 'rgb(244, 240, 240)',
                        backgroundImage: 'linear-gradient(to right, #80808018 1px, transparent 1px), linear-gradient(to bottom, #80808018 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                <Block xpad='large'>
                    <div className='py-20 flex flex-row relative z-5 justify-between items-center'>

                        {/* ── Left: text — staggered fade-up ── */}
                        <div className='flex flex-col justify-center bg-transparent' style={{ flexBasis: '50%' }}>
                            <motion.p className='section-eyebrow' {...fadeUp(0)}>
                                {partners.eyebrow}
                            </motion.p>

                            <motion.h2 className="section-title" style={{ fontSize: '4.2rem' }} {...fadeUp(0.08)}>
                                {partners.headline}
                                <br />
                                <span className="highlight">{partners.highlighted}</span>
                            </motion.h2>

                            <motion.p className="section-description" style={{ fontSize: '1.5rem' }} {...fadeUp(0.16)}>
                                {partners.description}
                            </motion.p>
                        </div>

                        {/* ── Right: card — fades in slightly after text ── */}
                        <motion.div
                            className="relative flex justify-center isolate"
                            style={{ flexBasis: '45%', marginLeft: 'auto' }}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: DUR, ease: EASE, delay: 0.22 }}
                        >
                            <div
                                className="relative w-full flex flex-col items-center justify-center z-30"
                                style={{
                                    borderRadius: '55px',
                                    background: 'rgb(255, 255, 255)',
                                    boxShadow: '0 18px 22px rgba(0,0,0,0.05), 0 1px 0 rgba(0,0,0,0) inset',
                                }}
                            >
                                {/* Accent glows */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(ellipse 100% 100% at 10% 15%, rgba(245,97,77,0.35) 0%, transparent 100%)',
                                        borderRadius: '55px',
                                    }}
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(ellipse 70% 80% at 90% 85%, rgba(150,77,245,0.15) 0%, transparent 100%)',
                                        borderRadius: '55px',
                                    }}
                                />

                                <PartnersLogoGrid />
                            </div>
                        </motion.div>

                    </div>
                </Block>
            </section>
        </Block>
    );
};

// ─── Logo grid ────────────────────────────────────────────────────────────────
const PartnersLogoGrid = () => (
    <div className="w-full flex flex-wrap justify-between gap-12 py-12 px-12">
        {partners.logos.map((logo, i) => (
            <motion.div
                key={i}
                className="w-[45%] h-auto aspect-[2/1] rounded-4xl shadow-lg flex items-center justify-center z-10"
                style={{ backgroundColor: 'white' }}
                // Entrance: stagger each logo, same curve as everything else
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                    duration: DUR,
                    ease: EASE,
                    delay: 0.28 + i * 0.06,
                }}
                // Hover: subtle lift — CSS handles this for performance
                whileHover={{
                    y: -4,
                    boxShadow: '0 12px 28px rgba(0,0,0,0.10)',
                    transition: { duration: 0.25, ease: 'easeOut' },
                }}
            >
                <img
                    src={logo}
                    alt={`Logo ${i}`}
                    className="max-h-10 max-w-[70%] object-contain"
                />
            </motion.div>
        ))}
    </div>
);

export default Partners;