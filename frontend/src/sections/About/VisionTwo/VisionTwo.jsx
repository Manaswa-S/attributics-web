import {vision} from '../../../constants/about';
import Block from '../../../components/layout/Block';
import { useState, useEffect, useRef } from 'react';
import {metricCards} from '../../../constants/about';

const VisionTwo = () => {
    return (
        <Block xpad='medium' topMargin='small'>
        <section id="about">
            {/* WHO ARE WE */}
            <div className="mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-12 lg:gap-22 items-center hyphens-none">
                    <div className="flex flex-col">
                        <p className="section-eyebrow ">
                            {vision.whoAreWe.eyebrow}
                        </p>
                        <h2 className="section-title mb-2 lg:!text-[3.5rem]">
                            {vision.whoAreWe.headline}
                            <br />
                            <span className="highlight">{vision.whoAreWe.highlightedText}</span>
                        </h2>
                        <div className='text-justify'>
                            {vision.whoAreWe.description.map((item, idx) => (
                                <p key={idx} className="section-description mb-4">
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-72 sm:h-96 lg:h-155">
                        <img
                            src={vision.whoAreWe.image}
                            alt="Group"
                            className="w-full h-full object-cover rounded-[10px]"
                            loading="eager"
                        />
                    </div>
                </div>
            </div>

            {/* STATEMENT */}
            <div className="mb-25 rounded-2xl rounded-[20px] py-1 text-center lg:px-[5%] hyphens-none">
                <div className="grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-2 lg:gap-12 justify-end mb-4 items-center">
                    <CurvedPath />
                    <h3
                        className="section-title lg:text-right text-center lg:!text-[2.3rem]"
                    >
                        Sustainable Growth is built on{" "}
                        <span className="highlight">Data</span>,
                        <br />
                        powered by <span className="highlight">Automation</span>,
                        <br />
                        and scaled through{" "}
                        <span className="highlight">Lifecycle Intelligence</span>.
                    </h3>
                </div>
                <MetricsBoth />
            </div>

            {/* VISSION & MISSION */}
            <div className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-12 lg:gap-22 items-center hyphens-none">
                <div className="w-full h-72 sm:h-96 lg:h-155">
                    <img
                        src={vision.vissionMission.image}
                        alt="Group"
                        className="w-full h-full object-cover rounded-[10px]"
                        loading="eager"
                    />
                </div>

                 {/* Text cards */}
                <div className="flex flex-col text-justify">
                    <p className="section-eyebrow mb-2">
                        {vision.vissionMission.eyebrow}
                    </p>
                    {/* Vision card */}
                    <div className="rounded-[10px] flex flex-col">
                        <h2 className="vision-title mb-2">
                            {vision.vissionMission.vision.headline}
                        </h2>
                        <p className="section-description">
                            {vision.vissionMission.vision.description}
                        </p>
                    </div>

                    {/* Mission card */}
                    <div className="rounded-[10px] flex flex-col justify-end">
                        <h2 className="vision-title mb-2">
                            {vision.vissionMission.mission.headline}
                        </h2>
                        <p className="section-description mb-2">
                            {vision.vissionMission.mission.description[0]}
                        </p>
                        <p className="section-description mb-2">
                            {vision.vissionMission.mission.description[1]}
                        </p>
                        <ul className="list-none space-y-2 pl-20">
                            {vision.vissionMission.mission.points.map((item, idx) => (
                                <li key={idx} className="section-description relative before:content-['➤'] before:text-black-500 before:absolute before:-left-7">
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

const MetricsBoth = () => {
    const [animatedMetrics, setAnimatedMetrics] = useState(metricCards.map(() => 0));
    const [isVisible, setIsVisible] = useState(false);
    const metricsRef = useRef(null);
    const timersRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];

            if (entry.isIntersecting) {
            setIsVisible(true);

            // Reset previous timers
            timersRef.current.forEach(clearInterval);
            timersRef.current = [];

            // Reset values
            setAnimatedMetrics(metricCards.map(() => 0));

            metricCards.forEach((card, index) => {
                const steps = 60;
                const increment = card.metric / steps;
                let step = 0;

                const timer = setInterval(() => {
                step++;

                setAnimatedMetrics((prev) => {
                    const copy = [...prev];
                    copy[index] =
                    step >= steps
                        ? card.metric
                        : Math.floor(step * increment);
                    return copy;
                });

                if (step >= steps) clearInterval(timer);
                }, 1000 / steps);

                timersRef.current.push(timer);
            });
            } else {
            setIsVisible(false);
            }
        },
        { threshold: 0.3 }
        );

        if (metricsRef.current) observer.observe(metricsRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={metricsRef}
            className="w-full flex flex-col"
        >
        <div className="grid grid-cols-2 gap-6 items-start w-full lg:flex lg:justify-between ">

            {metricCards.map((card, index) => (
            <div
                key={index}
                className={`
                    rounded-2xl py-4 w-full flex flex-col items-center text-center gap-2
                    transition-all duration-700 ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
                style={{ transitionDelay: `${index * 250}ms` }}
            >
                {/* Number + Arrow */}
                    <div className="flex items-center justify-center">
                        <h1 className="section-title" style={{fontSize: '2.5rem'}}>
                            {animatedMetrics[index]}
                        </h1>

                        <h1 className="section-title" style={{fontSize: '1.5rem'}}>
                            {card.unit}
                        </h1>

                        <GrowthArrow direction={card.postive ? "up" : "down"} />
                    </div>

                {/* Label */}
                <p className="section-description text-black">
                    {card.subheadline}
                </p>
            </div>
            ))}

        </div>
        </div>
    );
};

const GrowthArrow = ({ direction = "up" }) => {
    const isUp = direction === "up";
  
    return (
        <span
            className={`
                inline-flex items-center justify-center
                ${isUp ? "text-emerald-500 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]" 
                        : "text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.4)]"}
                transition-transform duration-300
                animate-pulse
                ${isUp ? "hover:-translate-y-1" : "hover:translate-y-1"}
            `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12"
            >
            {isUp ? (
                <path d="M12 4l6 8h-4v8h-4v-8H6l6-8z" />
            ) : (
                <path d="M12 20l-6-8h4V4h4v8h4l-6 8z" />
            )}
            </svg>
        </span>
    );
};

// Data points for the cycle
const cycleSteps = [
  { label: 'Data Intelligence', color: '#3b82f6' },
  { label: 'Automation', color: '#8b5cf6' },
  { label: 'Optimization', color: '#ec4899' },
  { label: 'Growth', color: '#10b981' },
];

const SVG_WIDTH = 700;
const VIEWBOX_WIDTH = 700;
const VIEWBOX_HEIGHT = 500;
const SVG_HEIGHT = SVG_WIDTH * 0.5714;

const CurvedPath = () => {
    return (
        <div className="relative w-full flex lg:justify-start justify-center">
          <svg
            width={SVG_WIDTH}
            height={SVG_HEIGHT}
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            className="block max-w-full h-auto"
            >
            <defs>
              <path
                id="curvedPath"
                d="M 100,250 Q 250,100 350,250 T 600,250"
                fill="none"
              />
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6">
                  <animate attributeName="stop-color" values="#3b82f6; #8b5cf6; #ec4899; #10b981; #3b82f6" dur="8s" repeatCount="indefinite"/>
                </stop>
                <stop offset="50%" stopColor="#8b5cf6">
                  <animate attributeName="stop-color" values="#8b5cf6; #ec4899; #10b981; #3b82f6; #8b5cf6" dur="8s" repeatCount="indefinite"/>
                </stop>
                <stop offset="100%" stopColor="#10b981">
                  <animate attributeName="stop-color" values="#10b981; #3b82f6; #8b5cf6; #ec4899; #10b981" dur="8s" repeatCount="indefinite"/>
                </stop>
              </linearGradient>
            </defs>
            
            {/* Main curved path */}
            <path
              d="M 100,250 Q 250,100 350,250 T 600,250"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              className="flowing-path"
            />
            
            {/* Flowing particles */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
             
              <circle
              r="6"
              fill={cycleSteps[i % 4].color}
              opacity="0.8"
            >
              <animateMotion dur="5s" repeatCount="indefinite" begin={`${i * 0.8}s`}>
                <mpath href="#curvedPath" />
              </animateMotion>
              <animate
                attributeName="r"
                values="4;7;4"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            ))}
            
            {/* Step labels */}
            <g className="step-label" style={{ animationDelay: '0s' }}>
              <circle cx="100" cy="250" r="45" fill={cycleSteps[0].color} opacity="0.15"/>
              <circle cx="100" cy="250" r="40" fill="white" stroke={cycleSteps[0].color} strokeWidth="3"/>
              <text x="100" y="255" textAnchor="middle" className="text-md font-bold" fill={cycleSteps[0].color}>
                Data
              </text>
            </g>
            
            <g className="step-label" style={{ animationDelay: '0.3s' }}>
              <circle cx="250" cy="150" r="45" fill={cycleSteps[1].color} opacity="0.15"/>
              <circle cx="250" cy="150" r="40" fill="white" stroke={cycleSteps[1].color} strokeWidth="3"/>
              <text x="250" y="155" textAnchor="middle" className="text-md font-bold" fill={cycleSteps[1].color}>
                Automate
              </text>
            </g>
            
            <g className="step-label" style={{ animationDelay: '0.6s' }}>
              <circle cx="450" cy="350" r="45" fill={cycleSteps[2].color} opacity="0.15"/>
              <circle cx="450" cy="350" r="40" fill="white" stroke={cycleSteps[2].color} strokeWidth="3"/>
              <text x="450" y="355" textAnchor="middle" className="text-md font-bold" fill={cycleSteps[2].color}>
                Optimize
              </text>
            </g>
            
            <g className="step-label" style={{ animationDelay: '0.9s' }}>
              <circle cx="600" cy="250" r="45" fill={cycleSteps[3].color} opacity="0.15"/>
              <circle cx="600" cy="250" r="40" fill="white" stroke={cycleSteps[3].color} strokeWidth="3"/>
              <text x="600" y="255" textAnchor="middle" className="text-md font-bold" fill={cycleSteps[3].color}>
                Grow
              </text>
            </g>
            
            {/* Connecting return arrow */}
            <path
              d="M 600,280 Q 550,400 350,420 Q 150,440 100,280"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="5 5"
              className="return-path"
            />
            <path
              d="M 95,285 L 100,280 L 105,285"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeLinecap="round"
              className="return-path"
            />
          </svg>
  
        <style>{`
          @keyframes flowingDash {
            to {
              stroke-dashoffset: -20;
            }
          }
          @keyframes stepPop {
            from {
              opacity: 0;
              transform: scale(0.5);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes returnDash {
            to {
              stroke-dashoffset: -10;
            }
          }
          .flowing-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawFlow 3s ease-out forwards;
    filter: drop-shadow(0 0 8px rgba(59,130,246,0.3));

}

@keyframes drawFlow {
  to {
    stroke-dashoffset: 0;
  }
}
          .particle {
            filter: drop-shadow(0 0 4px currentColor);
          }
          .step-label {
  opacity: 0;
  animation: stepPop 0.6s ease-out forwards,
             float 4s ease-in-out infinite;
}

@keyframes float {
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
          .return-path {
            stroke-dashoffset: 0;
            animation: returnDash 2s linear infinite;
          }
        `}</style>
      </div>
    );
};
  

export default VisionTwo;
