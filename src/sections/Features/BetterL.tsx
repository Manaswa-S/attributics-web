
import React from 'react';

const Block: React.FC<{ 
  label: string; 
  sublabel?: string; 
  dark?: boolean; 
  className?: string;
  isHeader?: boolean;
}> = ({ label, sublabel, dark, className = "", isHeader }) => (
  <div
  className={`flex flex-col items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
    dark
      ? 'bg-black text-white border-zinc-800'
      : 'bg-white/70 backdrop-blur-sm text-zinc-800 border-zinc-200'
  } ${className}`}
>
    {isHeader && <span className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest mb-1.5 opacity-80">Analytics</span>}
    <span className={`${sublabel ? 'text-[11px]' : 'text-[12px]'} font-medium text-center px-3`}>{label}</span>
    {sublabel && <span className="text-[10px] opacity-70 mt-0.5">{sublabel}</span>}
  </div>
);

const BetterL: React.FC = () => {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-6">

      <div className="relative w-full max-w-[1215px] aspect-[1200/750] group">
        {/* The L-Shaped Background with clip-path */}
        <div 
            className="absolute inset-0 overflow-hidden"
            style={{
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 65% 0%, 65% 50%, 0% 50%)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid #C1C1C1',
                borderRadius: '20px',

                background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 100%)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            }}
        >
          {/* Subtle Grid Background */}
        </div>

        {/* SVG for outline and lines to ensure crisp borders and connection flow */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1215 886" preserveAspectRatio="none" style={{borderRadius: '20px'}}>
            {/* The main outline of the clipped area */}
            <path 
              d="
                M 0% 100%
                L 0% 50%
                L 65% 50%
                L 65% 0%
                L 100% 0%
                L 100% 100%
                Z
              "
              fill="none" 
              stroke="#8F8F8F" 
              strokeWidth="1.5" 
              opacity="0.3"
            />


            {/* Connection Flow Lines */}
            {/* Vertical Trunk Line */}
            <line
              x1="1003"
              y1="90"
              x2="1003"
              y2="800"
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Horizontal Trunk Line */}
            <line
              x1="60"
              y1="664.5"
              x2="1000"
              y2="664.5"
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="4"
              strokeLinecap="round"
            />
        </svg>

        {/* Vertical Column (Right Leg) */}
        <div className="absolute left-[65%] right-0 top-0 bottom-0 flex flex-col items-center py-10 gap-5 z-10">
            {/* Analytics Header Block */}
            <Block 
              label="Plan next campaigns" 
              dark 
              isHeader 
              className="min-w-[160px] px-4 py-4"
            />
            
            <div className="w-full grid grid-cols-2 gap-6 px-16">
              <div className="flex justify-end">
                <Block label="AI + Humans" className="min-w-[110px] px-3 py-2" />
              </div>
              <div className="flex justify-start">
                <Block label="Real outcomes" className="min-w-[110px] px-3 py-2" />
              </div>
            </div>

            <Block 
              label="Opens, Clicks, Leads, APIs" 
              dark 
              className="min-w-[160px] px-4 py-4"
            />

            <div className="w-full grid grid-cols-2 gap-6 px-16">
              <div className="flex justify-end">
                <Block label="Feedback" className="min-w-[110px] px-3 py-2" />
              </div>
              <div className="flex justify-start">
                <Block label="Execution Agent" className="min-w-[110px] px-3 py-2" />
              </div>
            </div>

            <Block 
              label="Netcore, Braze, MoEngage" 
              dark 
              className="min-w-[160px] px-4 py-4"
            />
            
            <Block 
              label="1-to-1 AI decision" 
              className="min-w-[160px] px-4 py-4"
            />

            {/* Bottom-most block of the vertical stack */}
            <div className="mt-auto">
              <Block 
                label="Right channel + Right Time + Right message" 
                dark 
                className="min-w-[160px] px-4 py-4"
              />
            </div>
        </div>

        {/* Horizontal Row (Bottom Leg) */}
        <div className="absolute left-0 w-1/2 bottom-0 h-1/2 flex items-center justify-center px-10 z-10">
          <div className="w-full flex items-center justify-between  gap-5">
            <Block 
              label="Revenue Increase" 
              sublabel="by 10%" 
              dark 
              className="min-w-[160px] px-4 py-4"
            />
            <Block 
              label="Who is eligible," 
              sublabel="Budget limits" 
              dark 
              className="min-w-[160px] px-4 py-4"
            />
            <Block 
              label="Channel Offer Time" 
              dark 
              className="min-w-[160px] px-4 py-4"
            />
            <Block 
              label="Offers Creatives" 
              dark 
              className="min-w-[160px] px-4 py-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetterL;
