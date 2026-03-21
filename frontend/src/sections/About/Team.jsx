import { team } from '../../constants/about';
import Block from '../../components/layout/Block';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import WheelGestures from 'embla-carousel-wheel-gestures';
import { typography } from '../../constants/global';
import { useEffect, useState } from 'react';

const teamMemberNameSize = 'clamp(1.2rem, 1.06rem + 0.6vw, 1.5rem)';
const teamMemberRoleSize = 'clamp(1rem, 0.69rem + 0.22vw, 1rem)';

const Team = () => {
    return (
        <Block xpad='large'>
            <section className="bg-white relative">
                <motion.div
                    initial={{ opacity: 0.8, y: 2, x: 0 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.p
                        className="section-eyebrow"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {team.eyebrow}
                    </motion.p>
                    <motion.h1
                        className='section-title'
                        style={typography.title.XXL}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {team.headline}{' '}
                        <span className='highlight'>{team.highlighted}</span>
                    </motion.h1>
                </motion.div>

                <motion.div
                    className='overflow-x-hidden flex h-full mt-6'
                    style={{ '--fade': '0px' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <LeadershipTeam2 teamMembers={team.members} />
                </motion.div>
            </section>
        </Block>
    );
};

function LeadershipTeam({ teamMembers }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: 'center',
            loop: true,
            dragFree: false,
        },
        [
            Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }),
            WheelGestures({ forceWheelAxis: 'x', wheelSpeed: 1 }),
        ]
    );

    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(max-width: 767px)');
        const update = () => setIsMobile(mq.matches);
        update();
        if (mq.addEventListener) {
            mq.addEventListener('change', update);
            return () => mq.removeEventListener('change', update);
        }
        mq.addListener(update);
        return () => mq.removeListener(update);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        const update = () => setActiveIndex(emblaApi.selectedScrollSnap());
        update();
        emblaApi.on('select', update);
        emblaApi.on('reInit', update);
        return () => {
            emblaApi.off('select', update);
            emblaApi.off('reInit', update);
        };
    }, [emblaApi]);

    return (
        <div className="overflow-hidden w-full  mask-fade-x" ref={emblaRef}  style={{"--fade": "10px"}}>
            {/* lt-cards */}
            <div className="flex flex-row pb-[32px] pt-[32px]" >
                {teamMembers.map((member, idx) => {
                    const isActive = !isMobile || idx === activeIndex;
                    return (
                        // lt-card
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0.9, x: 3 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5}}
                            className="mr-4 w-[280px] md:w-[320px] h-[420px] snap-center shrink-0 bg-[#F5F2EB] rounded-[2rem] p-8 flex flex-col relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start z-10 relative">
                                <h3 className="section-title text-slate-900 w-1/2 leading-tight" style={{ fontSize: teamMemberNameSize, fontWeight: 600 }}>
                                    {member.fname}<br/>
                                    {member.lname}
                                </h3>
                                <span className="section-eyebrow text-slate-500" style={{ fontSize: teamMemberRoleSize, fontWeight: 600 }}>
                                    {member.role}
                                </span>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 top-22">
                            <img 
                                src={member.img} 
                                alt={member.name}
                                loading='eager'
                                className={`w-full h-full object-cover object-top mix-blend-multiply transition-all duration-500 ${
                                    isMobile ? (isActive ? 'grayscale-0' : 'grayscale') : 'grayscale group-hover:grayscale-0'
                                }`}
                                referrerPolicy="no-referrer"
                            />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
function LeadershipTeam2({ teamMembers }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { align: 'start', loop: true, dragFree: true },
        [Autoplay({ delay: 2000, stopOnMouseEnter: true, stopOnInteraction: false }),WheelGestures({ forceWheelAxis: 'x', wheelSpeed: 1 })]
    );

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;
        const update = () => setActiveIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', update);
        return () => emblaApi.off('select', update);
    }, [emblaApi]);

    return (
        <div className="overflow-hidden w-full mask-fade-x" ref={emblaRef} style={{ '--fade': '10px' }}>
            <div className="flex pb-[32px] pt-[32px]">
                {teamMembers.map((member, idx) => (
                    <div
                        key={idx}
                        className="mr-4 w-[280px] md:w-[320px] h-[420px] shrink-0 bg-[#F5F2EB] rounded-[2rem] p-8 flex flex-col relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start z-10 relative">
                            <h3 className="section-title text-slate-900 w-1/2 leading-tight" style={{ fontSize: teamMemberNameSize, fontWeight: 600 }}>
                                {member.fname}<br />
                                {member.lname}
                            </h3>
                            <span className="section-eyebrow text-slate-500" style={{ fontSize: teamMemberRoleSize, fontWeight: 600 }}>
                                {member.role}
                            </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 top-22">
                            <img
                                src={member.img}
                                alt={member.name}
                                loading="eager"
                                className={`w-full h-full object-cover object-top mix-blend-multiply transition-all duration-500
                                    grayscale group-hover:grayscale-0
                                    md:grayscale md:group-hover:grayscale-0
                                    ${idx === activeIndex ? 'grayscale-0' : 'grayscale'}
                                `}
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Team;
