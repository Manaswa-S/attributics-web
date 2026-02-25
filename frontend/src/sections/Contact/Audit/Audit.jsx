import Block from '../../../components/layout/Block/Block';
import { MailIcon, MapPinIcon, PhoneIcon } from '../../../components/Icons/Icons';
import { audit } from '../../../constants/contact';
import { useLocation } from "react-router-dom";

const AuditForm = () => {
    const location = useLocation();

    useEffect(() => {
        if (!window.location.search.includes("r=true")) {
        window.location.replace(
            window.location.pathname + "?r=true"
        );
        }
    }, [location.pathname]);
    
    return (
        <Block xpad='medium' topMargin='small'>
            <section className="min-h-[80vh] items-center justify-center flex flex-col lg:justify-around grid grid-cols-1 lg:grid-cols-[6fr_8fr] gap-6">
                
                {/* Left Side - Text Content */}
                <div className="flex-col flex ">
                    <p className="section-eyebrow">{audit.eyebrow}</p>
                    <h1 className="section-title">
                        {audit.headline}{' '}
                        <span className='highlight'>{audit.highlighted}</span>
                    </h1>
                    <p className="section-description">{audit.description}</p>

                    <div className='flex gap-2 mt-4 flex-col'>
                        <div className='items-center flex flex-row gap-2'>
                            <PhoneIcon />
                            <p className='section-description'>{audit.details.phone}</p>
                        </div>

                        <div className='items-center flex flex-row gap-2'>
                            <MailIcon />
                            <p className='section-description'>{audit.details.email}</p>
                        </div>

                        <div className='items-center flex flex-row gap-2'>
                            <MapPinIcon />
                            <p className='section-description'>{audit.details.location}</p>
                        </div>
                    </div>

                    <div className='flex lg:flex-row w-full mt-8 gap-6 justify-between flex-wrap'>
                        {audit.metrics.map((metric, index) => (
                            <div id={index} className='flex flex-col items-center'>
                                <p className='section-title' style={{fontSize: '2.5rem'}}>
                                    <span className=''>{metric.value}{metric.unit}</span>
                                    
                                </p>
                                <p className='section-description'>
                                    {metric.tagline}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <ZCal />
            </section>
        </Block>
    );
};

import { useEffect, useRef } from "react";
const ZCal = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Prevent duplicate loading
    if (document.querySelector('script[src="https://static.zcal.co/embed/v1/embed.js"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://static.zcal.co/embed/v1/embed.js";
    script.async = true;

    document.body.appendChild(script);

  }, []);

  return (
    <div ref={containerRef} className="zcal-inline-widget">
        <a href="https://zcal.co/i/WpWYKgNI">
        </a>
    </div>
  );
};

export default AuditForm;
