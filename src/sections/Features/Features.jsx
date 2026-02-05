import Container from '../../components/layout/Container';

const Features = () => {
    return (
        <section className="py-12 lg:py-24 overflow-hidden">
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Top Row - Two columns */}
                    <div className="flex flex-col lg:flex-row">
                        {/* Left - Title Area */}
                        <div className="lg:w-1/2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-tl-[12px] lg:rounded-bl-[12px] lg:rounded-tr-none rounded-tr-[12px] p-10 lg:p-16 min-h-[320px] flex flex-col justify-center">
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#888] mb-6">
                                AGENTIC AI AT WORK
                            </span>
                            <h2 className="text-3xl lg:text-[40px] font-bold leading-[1.2] text-[#131212]">
                                From Engagement<br />to Life time value
                            </h2>
                        </div>

                        {/* Right - DATA/ACTIONS Diagram */}
                        <div className="lg:w-1/2 bg-white border border-[#E5E5E5] border-l-0 rounded-tr-[12px] lg:rounded-tl-none rounded-bl-[12px] lg:rounded-bl-none p-10 lg:p-16 min-h-[320px] flex items-center justify-center relative">
                            {/* SVG for dotted lines and arrows */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320" fill="none" preserveAspectRatio="xMidYMid meet">
                                {/* Horizontal line coming from left with arrow */}
                                <path d="M0 160 L120 160" stroke="#CCCCCC" strokeWidth="2" strokeDasharray="8 6" />
                                {/* Arrow pointing right at the split */}
                                <polygon points="125,160 115,155 115,165" fill="#131212" />
                                
                                {/* Split to DATA (top) */}
                                <path d="M130 160 L160 160 L160 80 L180 80" stroke="#CCCCCC" strokeWidth="2" strokeDasharray="8 6" />
                                {/* Arrow to DATA */}
                                <polygon points="185,80 175,75 175,85" fill="#131212" />
                                
                                {/* Vertical line from DATA to ACTIONS */}
                                <path d="M220 115 L220 200" stroke="#CCCCCC" strokeWidth="2" strokeDasharray="8 6" />
                                
                                {/* Split to ACTIONS (bottom) */}
                                <path d="M130 160 L160 160 L160 240 L180 240" stroke="#CCCCCC" strokeWidth="2" strokeDasharray="8 6" />
                                {/* Arrow to ACTIONS */}
                                <polygon points="185,240 175,235 175,245" fill="#131212" />
                            </svg>

                            {/* Icons Container */}
                            <div className="flex flex-col items-center gap-16 relative z-10 ml-20">
                                {/* DATA Icon */}
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-[#131212] rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 2c4.42 0 8 1.57 8 3.5S16.42 11 12 11 4 9.43 4 7.5 7.58 4 12 4zm8 13.5c0 1.93-3.58 3.5-8 3.5s-8-1.57-8-3.5v-2.23c1.83 1.14 4.72 1.73 8 1.73s6.17-.59 8-1.73v2.23zm0-5c0 1.93-3.58 3.5-8 3.5s-8-1.57-8-3.5v-2.23c1.83 1.14 4.72 1.73 8 1.73s6.17-.59 8-1.73v2.23z"/>
                                        </svg>
                                    </div>
                                    <span className="text-xs text-[#666] mt-3 uppercase tracking-[0.15em] font-medium">DATA</span>
                                </div>

                                {/* ACTIONS Icon */}
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-[#131212] rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                    </div>
                                    <span className="text-xs text-[#666] mt-3 uppercase tracking-[0.15em] font-medium">ACTIONS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row - Full width light blue section */}
                    <div className="bg-[#E8F4FC] border border-[#E5E5E5] border-t-0 rounded-b-[12px] p-10 lg:py-12 lg:px-16 relative min-h-[200px]">
                        {/* SVG for horizontal flow lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 200" fill="none" preserveAspectRatio="none">
                            {/* Left incoming arrow line */}
                            <path d="M0 100 L80 100" stroke="#CCCCCC" strokeWidth="2" strokeDasharray="8 6" />
                            <polygon points="90,100 78,94 78,106" fill="#131212" />
                            
                            {/* Line from OUTCOME to AGENTS */}
                            <path d="M380 100 L520 100" stroke="#CCCCCC" strokeWidth="2" strokeDasharray="8 6" />
                            
                            {/* Line from AGENTS to AI */}
                            <path d="M620 100 L720 100" stroke="#CCCCCC" strokeWidth="2" strokeDasharray="8 6" />
                            
                            {/* Line from AI to right arrow */}
                            <path d="M820 100 L950 100" stroke="#CCCCCC" strokeWidth="2" strokeDasharray="8 6" />
                            <polygon points="960,100 948,94 948,106" fill="#131212" />
                        </svg>

                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                            {/* Left spacer for arrow */}
                            <div className="hidden lg:block w-16"></div>

                            {/* OUTCOME Card */}
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E5E5E5] min-w-[280px]">
                                <span className="text-[11px] text-[#888] uppercase tracking-[0.15em] font-medium block mb-3">OUTCOME</span>
                                <div className="bg-[#131212] text-white rounded-lg px-5 py-4">
                                    <h3 className="font-mono text-sm font-bold tracking-wider uppercase">15% REVENUE GROWTH</h3>
                                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                                        Turning every lead into an opportunity with Data & CRM
                                    </p>
                                </div>
                            </div>

                            {/* AGENTS Icon */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-[#131212] rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                                    </svg>
                                </div>
                                <span className="text-xs text-[#666] mt-3 uppercase tracking-[0.15em] font-medium">AGENTS</span>
                            </div>

                            {/* AI Icon */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-[#131212] rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/>
                                    </svg>
                                </div>
                                <span className="text-xs text-[#666] mt-3 uppercase tracking-[0.15em] font-medium">AI</span>
                            </div>

                            {/* Right spacer for arrow */}
                            <div className="hidden lg:block w-16"></div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Features;
