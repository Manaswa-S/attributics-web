import React from 'react';
import Block from '../../../components/layout/Block';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button/Button';
import { careers } from '../../../constants/careers';

import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useMemo, useEffect } from "react";

import Backdrop from '../../../components/Backdrop/Backdrop';

const Hero = () => {
  return (
    <Block xpad='none'>
        <div
            style={{
                background: "linear-gradient(to top,rgba(129, 129, 129, 0.4) 0%,rgb(190, 190, 190) 35%,rgb(255, 255, 255) 100%)"
            }}
            className="min-h-screen flex flex-col lg:pt-25 lg:mt-0 mt-20">
        {/* <div className="min-h-screen flex flex-col lg:pt-25 lg:mt-0 mt-20"> */}

            {/* Header Section */}
            <div className="text-center mb-4">
                <p className='section-eyebrow'>{careers.eyebrow}</p>

                <div className="flex justify-center items-center mb-2">
                    <h1 className="section-title lg:max-w-[40%]" style={{fontSize: '2.5rem'}}>
                        {careers.headline[0]}{' '}
                        <span className='highlight'>{careers.highlighted}</span>
                        {' '}{careers.headline[1]}
                    </h1>
                </div>
                
                <div className="flex justify-center items-center mb-2">
                    <p className="section-description mb-4 lg:max-w-[50%]">{careers.description}</p>
                </div>

                <Link to="/contact?type=career">
                    <Button
                        size='lg'
                        variant="primary"
                        className="text-white bg-black header-button-label rounded-lg"
                    >
                        {careers.buttonLabel}
                        <span>→</span>
                    </Button>
                </Link>
            </div>

            {/* CONTENT */}
            {/* <div className='px-10'>
                <StaticImgs />
            </div> */}
            <div className="flex-1 flex lg:items-center rounded-t-3xl">
                <CarouselImgs />
            </div>
        </div>
    </Block>
  );
};

const CarouselImgs = () => {

    const autoScroll = AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
    });

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true,
            align: 'center',
            dragFree: true,
        },
        [autoScroll]
    );

    const MIN_TILT = -5;
    const MAX_TILT = 5;

    const getRandomBetween = (min, max) =>
        Math.random() * (max - min) + min;

    // Generate random tilt once
    const imagesWithTilt = useMemo(() => {
        return careers.carouselImgs.map((image, index) => ({
            id: index,
            src: image,
            tilt: getRandomBetween(MIN_TILT, MAX_TILT)
        }));
    }, []);

  return (
    <div className="overflow-x-hidden h-full flex-1 flex py-20" ref={emblaRef}>
      <div className="flex h-full">
        {imagesWithTilt.map((image) => (
          <div 
            key={image.id} 
            className="
                flex-[0_0_90%] 
                sm:flex-[0_0_85%]
                md:flex-[0_0_50%]
                lg:flex-[0_0_35%]
                xl:flex-[0_0_35%]
                flex items-center px-4 sm:px-6 lg:px-8
            "
          >
            <div
              className="transition duration-300"
              style={{ transform: `rotate(${image.tilt}deg)` }}
            >
              <img
                src={image.src}
                loading='eager'
                className="rounded-3xl w-auto h-full object-cover shadow-2xl shadow-black/15"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StaticImgs = () => {
    return (
        <>
            {/* Content Section */}
            <div className="flex-1 flex items-end">
            {/* Image Grid */}
                <div className="h-full grid grid-cols-13 gap-4 flex items-end">
                    {/* Image 3 - Large Center */}
                    <div className="col-span-4">
                        <ImageCard img="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=1000&fit=crop" />
                    </div>

                    {/* Image 1 - Small */}
                    <div className="col-span-3">
                        <ImageCard img="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=700&fit=crop" />
                    </div>

                    {/* Image 2 - Medium */}
                    <div className="col-span-3">
                        <ImageCard img="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=700&fit=crop" />
                    </div>

                    {/* Image 5 - Small */}
                    <div className="col-span-3">
                        <ImageCard img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=600&fit=crop" />
                    </div>
                </div>
            </div>
        </>
    )
}

const ImageCard = ({img}) => {
    return (
        <div className="rounded-3xl overflow-hidden shadow-lg h-auto w-full">
            <img 
                src={img}
                alt="Team collaboration"
                className="w-full h-full object-cover"
            />
        </div>
    )
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
