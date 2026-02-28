import {vision} from '../../../constants/about';
import Block from '../../../components/layout/Block';
import { motion } from 'motion/react';
import {CheckCircle} from 'lucide-react';

const Vision = () => {
    return (
        <Block xpad='large'>
        <section id="about" className='h-full w-full'>
            {/* VISION & MISSION */}
            <motion.div 
                className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-12 lg:gap-22 items-center hyphens-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="w-full h-auto flex items-center"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <img
                        src={vision.vissionMission.image}
                        alt="Group"
                        className="w-full h-auto max-h-[80vh] object-cover rounded-[55px]"
                        loading="eager"
                    />
                </motion.div>

                {/* Text cards */}
                <motion.div 
                    className="flex flex-col text-justify"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.p 
                        className="section-eyebrow mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        {vision.vissionMission.eyebrow}
                    </motion.p>
                    
                    {/* Vision card */}
                    <motion.div 
                        className="rounded-[10px] flex flex-col"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <h2 className="vision-title mb-2">
                            {vision.vissionMission.vision.headline}
                        </h2>
                        <p className="section-description">
                            {vision.vissionMission.vision.description}
                        </p>
                    </motion.div>

                    {/* Mission card */}
                    <motion.div 
                        className="rounded-[10px] flex flex-col justify-end"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    >
                        <h2 className="vision-title mb-2">
                            {vision.vissionMission.mission.headline}
                        </h2>
                        <p className="section-description mb-2">
                            {vision.vissionMission.mission.description[0]}
                        </p>
                        <p className="section-description mb-2">
                            {vision.vissionMission.mission.description[1]}
                        </p>
                        <motion.ul 
                            className="list-none space-y-3"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.08,
                                        delayChildren: 0.6
                                    }
                                }
                            }}
                        >
                            {vision.vissionMission.mission.points.map((item, idx) => (
                                <motion.li 
                                    key={idx} 
                                    className="section-description relative flex-row gap-2 flex"
                                    variants={{
                                        hidden: { opacity: 0, y: 8 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CheckCircle className='text-brand' style={{fontWeight: '900'}} />
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
        </Block>
    );
};

export default Vision;