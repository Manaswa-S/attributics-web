import Block from '../../../components/layout/Block/Block';
import { audit } from '../../../constants/contact';
import { useLocation } from "react-router-dom";
import Calendar from '../../../components/Calendar/Calendar';
import { CheckCircle2 } from '../../../components/Icons/Icons';
import { motion } from 'motion/react';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay },
    }),
};

const CTA = () => {
    const location = useLocation();

    return (
        <Block xpad='large'>
            <section className="items-center justify-center flex flex-col lg:justify-between grid grid-cols-1 lg:grid-cols-[6fr_8fr] gap-12">

                {/* Left Side - Text Content */}
                <div className="flex-col flex">

                    <motion.p
                        className="section-eyebrow"
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {audit.eyebrow}
                    </motion.p>

                    <motion.h1
                        className="section-title"
                        style={{ fontSize: '4.2rem',  fontWeight: '600' }}
                        variants={fadeUp}
                        custom={0.1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        If These Questions Resonate,
                        <br />
                        <span className='highlight'>We Should Talk.</span>
                    </motion.h1>

                    <motion.div
                        className='w-full mb-3 mt-6'
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    />

                    <motion.p
                        className="section-description flex flex-col gap-4 mb-4"
                        style={{fontWeight: '600', fontSize: '1.6rem'}}
                        variants={fadeUp}
                        custom={0.25}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Here's what we'll cover:
                    </motion.p>

                    <div className="section-description flex flex-col gap-4">
                        {[
                            'Your current lifecycle and retention challenges',
                            'Where data silos are limiting performance',
                            'How to turn automation into intelligent personalization',
                            'Practical steps toward measurable growth',
                            'What meaningful progress would look like for your team',
                        ].map((item, i) => (
                            <motion.span
                                key={i}
                                className='flex flex-row gap-2'
                                variants={fadeUp}
                                custom={0.3 + i * 0.07}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <CheckCircle2 />{item}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Right Side - Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <Calendar />
                </motion.div>

            </section>
        </Block>
    );
};

export default CTA;