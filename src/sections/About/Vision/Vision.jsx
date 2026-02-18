import { about } from '../../../constants/content';
import { getGroupPhotos } from './constants';

import Block from '../../../components/layout/Block';

const Vision = () => {
    return (
        <Block xpad='15%' topMargin='5%'>
        <section id="about">
            <div className="relative">

                {/* WHO ARE WE */}
                <div className="mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
                        <div className="flex flex-col gap-4 pt-0 lg:pt-17">
                            <p className="uppercase text-xs tracking-[0.2em] text-[#999]"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                WHO ARE WE
                            </p>
                            <h2 className="text-3xl sm:text-4xl lg:text-[50px] leading-[140%] font-medium">
                                {about.whoAreWe.headline}
                            </h2>
                            <p className="text-base sm:text-lg lg:text-[20px]">
                                {about.whoAreWe.description}
                            </p>
                        </div>

                        <div className="w-full h-72 sm:h-96 lg:h-117">
                            <img
                                src={getGroupPhotos('1')}
                                alt="Group"
                                className="w-full h-full object-cover rounded-[10px]"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                {/* STATEMENT */}
                <div className="text-center mb-24 px-4">
                    <h3 className="italic text-xl sm:text-2xl lg:text-[40px] max-w-225 mx-auto">
                        "{about.statement}"
                    </h3>
                </div>

                {/* MISSION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
                    <div className="w-full h-72 sm:h-96 lg:h-117">
                        <img
                            src={getGroupPhotos('2')}
                            alt="Group"
                            className="w-full h-full object-cover rounded-[10px]"
                            loading="lazy"
                        />
                    </div>

                    <div className="flex flex-col gap-6 pt-0 lg:pt-17">
                        <p className="uppercase text-xs tracking-[0.2em] text-[#999]"
                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                            MISSION & VISION
                        </p>
                        {about.missionVision.map((item, idx) => (
                            <p key={idx} className="text-base sm:text-lg">
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </Block>
    );
};

export default Vision;
