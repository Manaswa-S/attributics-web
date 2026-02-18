import Block from '../../../components/layout/Block/Block';
import { useState, useEffect, useCallback, useRef } from 'react';
import discoveryBg from '../../../assets/discovery_background.svg';
import discoveryVectorBg from '../../../assets/discovery_background_vector.svg';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import WheelGestures from 'embla-carousel-wheel-gestures'

// Auto-scrolling questions/content with bold segments
const scrollingQuestions = [
    <>How do I drive <strong>discovery conversations</strong> for the <strong>new offerings</strong> with my users / customers?</>,
    <>How can I <strong>reduce churn</strong> and increase <strong>customer lifetime value</strong>?</>,
    <>How do I <strong>personalize experiences</strong> at scale without <strong>increasing costs</strong>?</>,
    <>How can I identify <strong>upsell opportunities</strong> before customers leave?</>,
    <>How do I <strong>automate campaigns</strong> while maintaining <strong>personalization</strong>?</>,
    <>How can I turn <strong>data</strong> into <strong>actionable insights</strong> in real-time?</>,
];

const AgenticAI = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      dragFree: false,
      duration: 50,
    },
    [
      WheelGestures({ forceWheelAxis: 'x', wheelSpeed: 0.6 }),
      Autoplay({ delay: 3500, stopOnInteraction: false }),
    ]
  )

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  const handleDotClick = (i) => {
    if (!emblaApi) return
  
    const autoplay = emblaApi.plugins()?.autoplay
    autoplay?.reset()
    emblaApi.scrollTo(i)
  }
  

    return (
        <Block xpad='15%'>
        <section id="products" className="w-full flex flex-col">
            {/* Top Section - Headline with CTA */}
            <div className="py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                {/* Text Block */}
                <div className="w-full sm:w-[60%]">
                    <h2 className="section-title">
                        Facing the same problems?
                    </h2>

                    <p className="section-description mt-4">
                        It's the growth that compounds. Intelligent agents continuously optimize engagement, retention, and expansion—turning every customer into a long-term value driver.
                    </p>
                </div>

                {/* Button */}
                <div className="w-full sm:w-auto">
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 w-full sm:w-auto bg-[#131212] text-white text-sm font-medium rounded-sm hover:bg-[#333] transition-colors whitespace-nowrap"
                    >
                        <span className="text-blue-400">✦</span>
                        <span>Book a call</span>
                        <span>→</span>
                    </a>
                </div>
            </div>


            {/* Carousel Container */}
            <div className="flex-[5] w-full py-25 flex items-center justify-center relative rounded-[10px] overflow-hidden bg-linear-to-br from-[#F2F2F2] to-[#FFA791]">
                {/* Backgrounds */}
                <img
                    src={discoveryBg}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <img
                    src={discoveryVectorBg}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Carousel */}
                <div className="absolute z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div ref={emblaRef} className="w-full h-full overflow-hidden">
                      <div className="flex h-full embla__container">
                            {scrollingQuestions.map((q, index) => (
                                <div key={index}
                                className="embla__slide shrink-0 w-full h-full flex items-center justify-center px-4">
                                    <p className="text-center text-sm sm:text-base lg:text-lg xl:text-xl text-[#131212] leading-relaxed [&>strong]:font-bold">
                                        {q}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex-[1] flex justify-center items-center py-2">
                <div className="flex flex-row flex-wrap items-start content-start p-0" style={{ gap: '3px 4px', width: '90px', height: '6px' }}>
                    {scrollingQuestions.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === index
                                    ? 'w-7.5 bg-[#131212]'
                                    : 'w-1.5 bg-[#CCCCCC] hover:bg-[#999]'
                                }`}
                            type="button"
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
        </Block>
    );
};

export default AgenticAI;