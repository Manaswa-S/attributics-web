import { careers } from '../../../constants/careers';
import Block from '../../../components/layout/Block/Block';

const Hero = () => {
    return (
        <>  
            <Block xpad='medium' topMargin='small'>
                <section className="relative lg:min-h-screen flex flex-col">
                    <div className=" lg:max-h-[85vh] items-center grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-12 lg:gap-22 "> 
                        <div className="flex justify-center flex-col ">
                            <div className='flex flex-col mb-10'>
                                <p className='section-eyebrow'>{careers.eyebrow}</p>
                                <h1 className='section-title'>{careers.headline}</h1>
                                <p className='section-description'>{careers.description}</p>
                            </div>

                            <div className="border border-[#E0E0E0] rounded-xl px-8 py-10 sm:px-12 sm:py-12 text-center  w-full">
                                <h2 className="content-title mb-4" style={{color: 'black'}}>{careers.workCard.headline}</h2>
                                <p className="content-description mb-4" style={{color: 'black'}}>{careers.workCard.description}</p>
                                <a
                                    href="/contact?type=career"
                                    className="content-description inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#131212] rounded-md hover:bg-[#333] active:scale-95 transition-all duration-200"
                                >
                                    {careers.workCard.buttonLabel}
                                    <span>→</span>
                                </a>
                            </div>
                        </div>

                        <div className="nicescroll  flex flex-col lg:overflow-y-auto lg:pr-4 scroll-smooth lg:max-h-[85vh]">
                            {/* Cards Grid */}
                            <div className="space-y-8">
                                {careers.jobs.map((job) => (
                                    <CareerCard key={job.id} job={job} />
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            </Block>
        </>
    );
};

const CareerCard = ({ job }) => {
    return (
      <div className="group bg-white rounded-2xl p-6 shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-300 flex flex-col justify-between">
  
        {/* Top Section */}
        <div>
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-[#131212]">
                    {job.title}
                </h3>
                <span className="text-xs uppercase tracking-wide bg-gray-100 px-3 py-1 rounded-full">
                    {job.department}
                </span>
            </div>
  
            {/* Meta Info */}
            <div className="mb-2">
                <p className='content-description' style={{color: 'black'}}>
                    {job.location}
                    <span className="content-description" style={{color: 'black'}}>{' '}·{' '}</span>
                    {job.type}
                </p>
                <p className='content-description' style={{color: 'black'}}>
                    {job.experience}
                    <span className="content-description" style={{color: 'black'}}>{' '}·{' '}</span>
                    {job.compensation}
                </p>
            </div>
  
            {/* Skills */}
            <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, idx) => (
                <span
                    key={idx}
                    className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                >
                    {skill}
                </span>
                ))}
            </div>
        </div>
  
        {/* Bottom CTA */}
        <button className="content-description mt-3 w-full bg-[#131212] py-3 rounded-lg hover:bg-black/70 transition">
            Apply Now
        </button>
      </div>
    );
};

export default Hero;
