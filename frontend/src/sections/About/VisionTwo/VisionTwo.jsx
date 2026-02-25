import {vision} from '../../../constants/about';
import Block from '../../../components/layout/Block';
import { useState, useEffect, useRef } from 'react';
import {metricCards} from '../../../constants/about';

const VisionTwo = () => {
    return (
        <Block xpad='medium' topMargin='small'>
        <section id="about">
            {/* WHO ARE WE */}
            <div className="mb-25">
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
            <div className="mb-25 rounded-2xl rounded-[20px] py-6 text-center lg:px-[10%] hyphens-none"
                style={{
                    // background: "linear-gradient(to top,rgb(255, 255, 255) 0%,rgba(224, 224, 224, 0.4) 25%,rgba(192, 192, 192, 0.4) 60%,rgb(255, 255, 255) 95%,rgb(255, 255, 255) 100%)"
                }}>
                <h3 className="section-title" style={{fontSize: '2.3rem', fontStyle: ''}}>
                    {vision.statement.normal}{' '}
                    <span className='highlight'>{vision.statement.highlighted}</span>
                </h3>
                <Metrics />
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

const Metrics = () => {
    const [animatedMetrics, setAnimatedMetrics] = useState(metricCards.map(() => 0));
    const metricsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
      
            if (entry.isIntersecting) {
              // Reset to 0 before starting
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
              });
            }
          },
          { threshold: 0.3 }
        );
      
        if (metricsRef.current) {
          observer.observe(metricsRef.current);
        }
      
        return () => observer.disconnect();
      }, []);

    return (
        <>
            {/* METRICS */}
            <div className="lg:px-[10%] relative w-full overflow-hidden animate-fade-in-up flex flex-col" style={{ animationDelay: '0.2s' }}>
                {/* White Card Overlay */}
                <div
                    ref={metricsRef}
                    className="
                        relative
                        flex
                        items-center
                        justify-center
                        mx-auto
                        mt-auto

                        px-6
                        pt-6

                        w-full
                        h-full
                        "
                    style={{
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-6
                            place-items-center
                            w-full

                            lg:flex
                            lg:items-center
                            lg:justify-between
                        "
                    >
                        {metricCards.map((card, index) => (
                            <div
                                key={index}
                                className="rounded-2xl p-2 w-full h-auto flex flex-col items-center align-center justify-center text-center gap-2"
                                // style={{ backgroundColor: card.postive == true ? `rgba(16, 185, 129, 0.07)` : 'rgba(244, 63, 94, 0.07)' }}
                            >
                                {/* Headline */}
                                <div className="flex items-center justify-center">
                                    <h1
                                        className="section-title"
                                        style={{ fontSize: "3rem", color: "black" }}
                                    >
                                        <span className=''>
                                            {animatedMetrics[index]}
                                        </span>
                                    </h1>

                                    <span
                                        style={{
                                        fontSize: "2rem",
                                        fontStyle: "italic",
                                        lineHeight: 1,
                                        }}
                                    >
                                        {card.unit}
                                    </span>

                                    <GrowthArrow direction={card.postive == true ? "up" : "down"} />

                                    </div>

                                {/* Subheadline */}
                                <p
                                    className="section-description" style={{fontSize: '1.3rem', color: 'black'}}>
                                    {card.subheadline}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

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

export default VisionTwo;
