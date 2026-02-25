import Block from "../../../components/layout/Block";
import { getstarted } from "../../../constants/about";
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
const GetStarted = () => {
    return (
        <Block xpad='large'>
            <AuditCTA />
        </Block>
    )
};

const AuditCTA = () => {
    return (
        <section className="w-full">
            <div
                className="
                
                border
                border-[#CFCFCF]
                rounded-[24px]
                px-6
                py-8
                lg:px-16
                lg:py-14

                flex
                flex-col
                gap-6
                items-center
                text-center
            "
            >
                {/* Left Content */}
                <div className="lg:max-w-[70vw]">
                    <p className="section-eyebrow mb-4">{getstarted.eyebrow}</p>
                    <SwitchingHeadline />
                    <h3 className="section-description mt-3">
                        {getstarted.description}
                    </h3>
                </div>

                {/* CTA Button */}
                <div className="flex-shrink-0">
                    <Link to="/contact">
                        <Button
                            variant="primary"
                            className="text-white bg-black header-button-label rounded-lg"
                        >
                            {getstarted.ctaText}
                            <span className="text-xl">→</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

import { useState, useEffect, useRef } from 'react';

const SwitchingHeadline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const measureRef = useRef(null);
  const switchTime = 2500;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % getstarted.highlighted.length);
    }, switchTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!measureRef.current) return;
  
    const widths = getstarted.highlighted.map(word => {
      measureRef.current.textContent = word;
      return measureRef.current.offsetWidth;
    });
  
    setMaxWidth(Math.max(...widths));
  }, []);


  return (
    <div className="flex items-center justify-center">
        <div className="text-start">
            <h1 className="section-title" style={{fontSize: '3rem'}}>
                {getstarted.headline}{' '}
                <span 
                    className={`inline-block relative `}
                    style={{ width: maxWidth > 0 ? `${maxWidth}px` : 'auto' }}
                >
                    <span
                        key={currentIndex}
                        ref={measureRef}
                        className="switching-word highlight"
                    >
                        {getstarted.highlighted[currentIndex]}.
                    </span>
                </span>
            </h1>
        </div>

      <style>{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        .switching-word {
          animation: fadeSlideIn 3s ease-in-out;
          display: inline-block;
          text-align: left;
          top: 0;
        }
      `}</style>
    </div>
  );
};

export default GetStarted;