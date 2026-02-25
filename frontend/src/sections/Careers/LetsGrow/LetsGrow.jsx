import React from 'react';
import { letsgrow, companies } from '../../../constants/careers';
import Block from '../../../components/layout/Block';

export default function LetsGrow() {
  return (
    <>
    <Block xpad='larger'>
      {/* Header Section */}
      <div className="mb-30">
          <p className='section-eyebrow'>{letsgrow.eyebrow}</p>
          <h1 className="section-title mb-4" style={{fontSize: '2.5rem'}}>
              {letsgrow.headline[0]}{' '}
              <span className='highlight'>{letsgrow.highlighted}</span>
              {' '}{letsgrow.headline[1]}
            </h1>
          <p className="section-description mb-4">
              {letsgrow.description}
          </p>
          <a href={letsgrow.readMore.link}>
              <p className='section-description'>
                  {letsgrow.readMore.btnLabel}{' '}
                  <span>→</span>
              </p>
          </a>
      </div>
    </Block>

    <Block xpad='large'>
      {/* Companies Section */}
      <div>
        <div className='text-center'>
          <p className='section-eyebrow mb-4'>{companies.eyebrow}</p>
          <h2 className="section-title mb-12" style={{fontSize: '2.5rem'}}>
            {companies.headline}
          </h2>
        </div>
        
        {/* Logo Grid */}
        <div className="flex flex-wrap gap-16 items-center justify-center">
          {companies.logoList.map((logo, index) => (
            <div 
              key={index}
              className="flex items-center justify-center h-auto"
            >
              <img 
                src={logo} 
                className="w-35 max-h-16 object-contain" 
                alt="company-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </Block>
    </>
  );
}