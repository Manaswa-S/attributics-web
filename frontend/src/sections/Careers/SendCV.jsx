import { ArrowRight, ChevronDown, Upload } from "lucide-react";
import Block from "../../components/layout/Block";

const SendCV = () => {
    return (
        <>
            <Block xpad="small" topMargin="small">
            {/* Jobs Section */}
            <section className="container mx-auto px-6 max-w-4xl mb-32">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-4 block">What are you waiting for?</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">
                    Interested in joining <span className="text-[#FF5A36]">us?</span>
                    </h2>
                </div>
        
                <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex flex-col gap-6">
                    
                    {/* Role Field */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Select Role</label>
                        <div className="relative">
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/20 focus:border-[#FF5A36] transition-all appearance-none cursor-pointer">
                            <option value="" disabled selected>Choose a position...</option>
                            <optgroup label="Data & Analytics">
                            <option value="Junior Business Analyst">Junior Business Analyst</option>
                            <option value="Marketing Data Analyst">Marketing Data Analyst</option>
                            <option value="Mid Business Analyst">Mid Business Analyst</option>
                            <option value="Senior BA">Senior BA</option>
                            <option value="Head of Insights & Strategy">Head of Insights & Strategy</option>
                            </optgroup>
                            <optgroup label="Engineering & Development">
                            <option value="Intern SDE">Intern SDE</option>
                            <option value="Emerging Tech Intern">Emerging Tech Intern</option>
                            <option value="Junior Associate Software Engineer">Junior Associate Software Engineer</option>
                            <option value="Full-Stack Developer (MarTech)">Full-Stack Developer (MarTech)</option>
                            <option value="Mid Software Development Engineer">Mid Software Development Engineer</option>
                            <option value="Systems Integration Engineer">Systems Integration Engineer</option>
                            <option value="Senior SDE">Senior SDE</option>
                            <option value="Senior Platform Engineer">Senior Platform Engineer</option>
                            </optgroup>
                            <optgroup label="Leadership & Executive">
                            <option value="Director of Engineering">Director of Engineering</option>
                            <option value="VP of Delivery">VP of Delivery</option>
                            <option value="Chief Technology Officer (CTO)">Chief Technology Officer (CTO)</option>
                            <option value="VP of Growth & Innovation">VP of Growth & Innovation</option>
                            </optgroup>
                            <optgroup label="Specialized MarTech Roles">
                            <option value="Implementation Specialist">Implementation Specialist</option>
                            <option value="Marketing Automation Developer">Marketing Automation Developer</option>
                            <option value="Conversion Rate Optimization (CRO) Specialist">Conversion Rate Optimization (CRO) Specialist</option>
                            <option value="Technical Product Manager">Technical Product Manager</option>
                            </optgroup>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                        </div>
                    </div>
        
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Location Preference */}
                        <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Location Preference</label>
                        <div className="relative">
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/20 focus:border-[#FF5A36] transition-all appearance-none cursor-pointer">
                            <option value="" disabled selected>Select location...</option>
                            <option value="pune">Pune, India</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                        </div>
                        </div>
        
                        {/* Work Type */}
                        <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Work Type</label>
                        <div className="relative">
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/20 focus:border-[#FF5A36] transition-all appearance-none cursor-pointer">
                            <option value="" disabled selected>Select type...</option>
                            <option value="onsite">Onsite</option>
                            <option value="offsite">Offsite</option>
                            <option value="hybrid">Hybrid</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                        </div>
                        </div>
                    </div>
        
                    {/* CV Upload */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Upload CV</label>
                        <div className="relative group">
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl px-5 py-8 text-slate-500 flex flex-col items-center justify-center gap-3 group-hover:bg-[#FF5A36]/5 group-hover:border-[#FF5A36]/30 transition-colors">
                            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#FF5A36] transition-colors">
                            <Upload size={24} />
                            </div>
                            <div className="text-center">
                            <span className="font-bold text-slate-700 group-hover:text-[#FF5A36] transition-colors">Click to upload</span> or drag and drop
                            <p className="text-xs text-slate-400 mt-1">PDF, DOCX up to 10MB</p>
                            </div>
                        </div>
                        </div>
                    </div>
        
                    <div className="pt-4 flex justify-center">
                        <button className="group relative px-10 py-4 bg-slate-900 text-white rounded-full font-semibold overflow-hidden transition-all hover:pr-14">
                        <span className="relative z-10 flex items-center gap-2">
                            Send CV
                        </span>
                        <ArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
                        </button>
                    </div>
                    </div>
                </div>
            </section>
            </Block>
        </>
    );
};

export default SendCV;