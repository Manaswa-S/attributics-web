import Block from '../../components/layout/Block/Block';
import Calendar from '../../components/Calendar/Calendar';
import { motion } from 'motion/react';
import { cta } from '../../constants/home';
import { typography } from '../../constants/global';

import { CheckCircle2 } from 'lucide-react';
import CalCom from '../../components/CalCom/CalCom';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay },
    }),
};

const CTA = () => {
    return (
        <Block xpad='medium'>
            
            <section className="items-center justify-center grid grid-cols-1  lg:grid-cols-[6fr_10fr] gap-10 sm:gap-12 lg:gap-8 items-stretch">

                {/* Left: Text */}
                <div className="w-full h-full justify-center flex flex-col">
                    <motion.p
                        className="section-eyebrow mb-3 sm:mb-4"
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {cta.eyebrow}
                    </motion.p>

                    <motion.h1
                        className="section-title"
                        style={typography.title.XXL}
                        variants={fadeUp}
                        custom={0.1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {cta.headline}
                    </motion.h1>
                    <motion.h1
                        className="section-title mb-5 sm:mb-6"
                        style={typography.title.XXL}
                        variants={fadeUp}
                        custom={0.1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <span className="highlight">{cta.highlighted}</span>
                    </motion.h1>

                    <motion.p
                        className="section-description mb-4"
                        style={typography.desc.Bold}
                        variants={fadeUp}
                        custom={0.25}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {cta.checklist.headline}
                    </motion.p>

                    <div
                        className=" flex flex-col gap-3 sm:gap-4"
                    >
                        {cta.checklist.items.map((item, i) => (
                            <motion.span
                                key={i}
                                className="section-description flex flex-row gap-2 items-center"
                                style={typography.desc.Normal}
                                variants={fadeUp}
                                custom={0.3 + i * 0.07}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <CheckCircle2  className="text-brand shrink-0" />
                                {item}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Right: Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-full flex flex-col"
                >
                    <CalCom />
                </motion.div>
                
            </section>
        </Block>
    );
};

export default CTA;
