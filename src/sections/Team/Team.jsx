import Container from '../../components/layout/Container';
import { siteContent } from '../../constants/content';

const Team = () => {
    const { team } = siteContent;

    return (
        <section className="py-16 lg:py-24 bg-white">
            <Container>
                <div className="mb-16">
                    <p className="text-[12px] font-mono uppercase tracking-wider text-[#999] mb-4">
                        TEAM
                    </p>
                    <h2 className="text-[42px] lg:text-[56px] font-normal leading-[120%] text-[#131212]">
                        {team.headline}
                    </h2>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {team.members.map((member, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-[12px] mb-4 aspect-square bg-gradient-to-b from-[#2A3D5A] to-[#1a2433]">
                                {/* Placeholder for member image */}
                                <div className="w-full h-full flex items-end justify-center p-6">
                                    <div className="text-center">
                                        <div className="text-white text-[14px] font-medium mb-1">{member.name}</div>
                                        <div className="text-[#FF6758] text-[12px] font-mono uppercase tracking-wider">
                                            {member.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-[18px] font-normal text-[#131212] mb-2">{member.name}</h3>
                                <p className="text-[14px] text-[#666] leading-[160%]">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Team;
