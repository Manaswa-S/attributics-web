import { team } from '../../../constants/about';
import Block from '../../../components/layout/Block';
import LeadershipTeam from './Scroll';

const Team = () => {
    return (
        <Block xpad='large'>
            <section className="bg-white relative">
                <div className=''>
                    <p className="section-eyebrow">
                        {team.eyebrow}
                    </p>
                    <h1 className='section-title'>
                        {team.headline}{' '}
                        <span className='highlight'>{team.highlighted}</span>
                    </h1>
                </div>

                {/* <DefaultTeamList /> */}
                <div className='overflow-x-hidden' style={{ '--fade': '0px' }}>
                    <LeadershipTeam teamMembers={team.members} />
                </div>
            </section>
        </Block>
    );
};

const DefaultTeamList = () => {
    return (
        <>
            {/* Team Members Grid */}
            <div className="flex gap-8 w-full h-80 overflow-auto scrollbar-hide mask-fade-x" style={{ '--fade': '8px' }}>
                {team.members.map((member, index) => (
                    <div key={index} className="group cursor-pointer relative">
                        <div className="w-58 h-80 overflow-hidden rounded-xl mb-4 aspect-square bg-linear-to-b from-[#2A3D5A] to-[#1a2433]">
                            {/* Placeholder for member image */}
                            <img
                                src={`/src/assets/team/${member.imgKey === '' ? 'placeholder.webp' : member.imgKey}`}
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
        </>
    )
}

export default Team;
