import { useRef } from 'react';
import { team } from '../constants/content';
import Block from '../components/layout/Block';

const CareersPage = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>  
            <Block xpad='15%' topMargin='7%'>
            {/* Hero + Team Section */}
            <section className="overflow-hidden mb-20">
                    {/* Eyebrow + Heading */}
                    <div className="mb-10 lg:mb-14">
                        <p
                            className="uppercase text-xs tracking-[0.2em] text-[#999] mb-3"
                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                            WHY WORK WITH US?
                        </p>
                        <h1
                            className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[130%] text-[#131212]"
                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                        >
                            Strong / catchy
                            <br />
                            sub headline here
                        </h1>
                    </div>

                    {/* Horizontally Scrollable Team Cards */}
                    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
                        <div
                            ref={scrollRef}
                            className="flex gap-4 overflow-x-auto scrollbar-hide careers-team-scroll px-4 sm:px-6 lg:px-8"
                        >
                            {team.members.map((member, index) => (
                                <div
                                    key={index}
                                    className="shrink-0 w-40 sm:w-45 lg:w-50 aspect-3/4 rounded-[10px] overflow-hidden relative cursor-pointer group"
                                >
                                    {/* Member Image Background */}
                                    <img
                                        src={`https://i.pinimg.com/736x/b7/e7/fc/b7e7fcd7c14ba4114170a4ed159a2897.jpg`}
                                        alt={member.name}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />

                                    {/* Dark gradient background overlay */}
                                    <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/60" />

                                    {/* Hover overlay — slides up from bottom */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                                    {/* Bio — fades in and slides up on hover */}
                                    <div className="absolute inset-x-0 bottom-0 p-3 lg:p-4 flex flex-col justify-end">
                                        {/* Bio text — hidden by default, revealed on hover */}
                                        <p
                                            className="text-white/90 text-[10px] sm:text-[11px] leading-[150%] mb-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100"
                                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                        >
                                            {member.bio}
                                        </p>

                                        {/* Name — always visible */}
                                        <p
                                            className="text-white text-xs sm:text-sm font-medium leading-tight"
                                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                        >
                                            {member.name}
                                        </p>

                                        {/* Role — always visible, color changes on hover */}
                                        <p
                                            className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider mt-0.5 group-hover:text-[#F5614D] transition-colors duration-300"
                                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                        >
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </section>
            </Block>

            {/* Work For The Future CTA */}
            <Block xpad='15%'>
            <section className="pb-16 lg:pb-24 bg-white">
                    <div className="flex justify-center">
                        <div className="border border-[#E0E0E0] rounded-xl px-8 py-10 sm:px-12 sm:py-12 text-center max-w-xl w-full">
                            <h2
                                className="uppercase text-sm sm:text-base tracking-widest font-semibold text-[#131212] mb-4"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                WORK FOR THE FUTURE!
                            </h2>
                            <p
                                className="text-sm sm:text-base text-[#666] leading-[160%] mb-6"
                                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                            >
                                Do you want to work on the future of AI agentic marketing. Join our team at attributics. Fill in the form below.
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#131212] text-white text-sm font-medium rounded-md hover:bg-[#333] active:scale-95 transition-all duration-200"
                                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                            >
                                Join us <span>→</span>
                            </a>
                        </div>
                    </div>
            </section>
            </Block>
            
            <style>{`
                /* White fade blur on both left and right edges of scrollable team cards */
                .careers-team-scroll {
                    position: relative;
                    mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        white 1%,
                        white 92%,
                        transparent 100%
                    );
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        white 1%,
                        white 92%,
                        transparent 100%
                    );
                }
            `}</style>
        </>
    );
};

export default CareersPage;
