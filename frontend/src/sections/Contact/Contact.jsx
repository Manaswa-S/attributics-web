import Block from '../../components/layout/Block/Block';
import { audit } from '../../constants/contact';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import CalCom from '../../components/CalCom/CalCom';
import { typography } from '../../constants/global';

const ContactForm = () => {
    return (
        <Block xpad='medium' topMargin='small'>
            <section className="min-h-[80vh] justify-center  flex flex-col lg:justify-between grid grid-cols-1 lg:grid-cols-[6fr_8fr] gap-6">
                
                {/* Left Side - Text Content */}
                <motion.div 
                    className="flex-col flex lg:self-start lg:mt-[20%]"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.p 
                        className="section-eyebrow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {audit.eyebrow}
                    </motion.p>
                    
                    <motion.h1 
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={typography.title.XXL}
                    >
                        {audit.headline}{' '}
                        <span className='highlight'>{audit.highlighted}</span>
                    </motion.h1>
                    
                    <motion.p 
                        className="section-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={typography.desc.Small}
                    >
                        {audit.description}
                    </motion.p>

                    <motion.div 
                        className='flex gap-2 mt-4 flex-col'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {[
                            { Icon: Phone, text: audit.details.phone },
                            { Icon: Mail, text: audit.details.email },
                            { Icon: MapPin, text: audit.details.location }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                className='items-center flex flex-row gap-2'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                            >
                                <item.Icon size={18} className='text-brand' />
                                <p className='section-description' style={typography.desc.Small}>{item.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div 
                        className='flex lg:flex-row w-full mt-8 gap-6 justify-around flex-wrap'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        {audit.metrics.map((metric, index) => (
                            <motion.div 
                                key={index}
                                className='flex flex-col items-center'
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                            >
                                <p className='section-title' style={typography.title.LG}>
                                    <span className=''>{metric.value}{metric.unit}</span>
                                </p>
                                <p className='section-description' style={typography.desc.Small}>
                                    {metric.tagline}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Side - Calendar */}
                {/* <Calendar /> */}
                <CalCom />
            </section>
        </Block>
    );
};

export default ContactForm;