import { getGroupPhotos } from './constants';
import {vision} from '../../../constants/about';
import Block from '../../../components/layout/Block';

const Vision = () => {
    return (
        <Block xpad='15%' topMargin='7%'>
        <section id="about">
            {/* WHO ARE WE */}
            <div className="mb-30">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-22 items-center hyphens-auto">
                    <div className="flex flex-col">
                        <p className="section-eyebrow ">
                            {vision.whoAreWe.eyebrow}
                        </p>
                        <h2 className="vision-title mb-2">
                            {vision.whoAreWe.headline}
                        </h2>
                        <div className='text-justify'>
                            {vision.whoAreWe.description.map((item, idx) => (
                                <p key={idx} className="section-description mb-4">
                                    {item}
                                </p>
                            ))}
                        </div>
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
            <div className="text-center mb-30 lg:px-[15%]">
                <h3 className="vision-title" style={{fontSize: '31px', fontStyle: 'italic'}}>
                    {vision.statement[1]}
                </h3>
            </div>

            {/* MISSION */}
            <div className=" grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-22 items-center">
                <div className="w-full h-72 sm:h-96 lg:h-117">
                    <img
                        src={getGroupPhotos('2')}
                        alt="Group"
                        className="w-full h-full object-cover rounded-[10px]"
                        loading="lazy"
                    />
                </div>

                <div className="flex flex-col  text-justify">
                    <p className="section-eyebrow">
                        {vision.vissionMission.eyebrow}
                    </p>
                    
                    <div>
                        <h2 className="vision-title mb-2">
                            {vision.vissionMission.vision.headline}
                        </h2>
                        <p className="section-description mb-4">
                            {vision.vissionMission.vision.description}
                        </p>
                    </div>

                    <div>
                        <h2 className="vision-title mb-2">
                            {vision.vissionMission.mission.headline}
                        </h2>

                        <p className="section-description mb-2">
                            {vision.vissionMission.mission.description[0]}
                        </p>

                        <p className="section-description mb-2">
                            {vision.vissionMission.mission.description[1]}
                        </p>

                        <ul className="list-disc lg:pl-[10%] pl-[2%] space-y-2 section-description">
                            {vision.vissionMission.mission.points.map((item, idx) => (
                                <li key={idx}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>



                    
                </div>
            </div>
        </section>
        </Block>
    );
};

export default Vision;
