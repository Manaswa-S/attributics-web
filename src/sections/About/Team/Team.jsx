import { team } from '../../../constants/content';
import { getTeamPhoto } from './constants';
import Block from '../../../components/layout/Block';

const Team = () => {
    return (
        <Block xpad='15%'>
            <section className="bg-white mx-auto relative">
                <div className="">
                    <p className="text-[12px] font-mono uppercase tracking-wider text-[#999] mb-4">
                        TEAM
                    </p>
                </div>

                {/* Team Members Grid */}
                <div className="flex gap-8 w-full h-69 overflow-hidden scrollbar-hide mask-fade-x" style={{ '--fade': '10px' }}>
                    {team.members.map((member, index) => (
                        <div key={index} className="group cursor-pointer relative">
                            <div className="w-49.25 h-69 overflow-hidden rounded-xl mb-4 aspect-square bg-linear-to-b from-[#2A3D5A] to-[#1a2433]">
                                {/* Placeholder for member image */}
                                <img
                                    src={getTeamPhoto(member.imgKey)}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    loading='lazy'
                                />

                                {/* Intro box */}
                                <div
                                    className=" absolute left-1/2 -translate-x-1/2
                                        bottom-3 w-43.25 h-15.5
                                        text-center rounded-lg px-4 py-2" style={{ backgroundColor: '#ffffff' }}>
                                    <div className="text-center">
                                        <div className="font-ibm-sans text-[16px] font-normal leading-[140%] text-black">
                                            {member.name}
                                        </div>
                                        <div className="font-ibm-sans text-[12px] font-normal leading-[130%] uppercase text-black">
                                            {member.role}
                                        </div>
                                    </div>
                                </div>

                                {/* Details Box, *Replaces card */}
                                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                                    <h3 className="text-[18px] font-normal text-[#131212] mb-2">{member.name}</h3>
                                    <p className="text-[14px] text-[#666] leading-[160%] text-center">{member.bio}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Block>
    );
};

export default Team;
