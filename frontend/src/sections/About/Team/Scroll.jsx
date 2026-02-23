import './scroll.css';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import WheelGestures from 'embla-carousel-wheel-gestures'

export default function LeadershipTeam({teamMembers}) {

    const [emblaRef] = useEmblaCarousel(
        { 
            align: 'start',
            loop: false,
            dragFree: false,
        },
        [
            Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true}),
            WheelGestures({ forceWheelAxis: 'x', wheelSpeed: 1 }),
        ]
    );
    
    return (
        <>
            <div className='lt-viewport' ref={emblaRef}>
                <div className="lt-cards">
                    {teamMembers.map((member) => (
                        <div className="lt-card" key={member.id}>
                            <div className="lt-card-header">
                                <div className="lt-name">{member.name.split(' ')[0]}<br />{member.name.split(' ')[1]}</div>
                                <div className="lt-title">{member.role.split(' ')[0]}<br />{member.role.split(' ')[1]}</div>
                            </div>

                            <div className="lt-image-wrap">
                                <img
                                    className="lt-image"
                                    src={member.img}
                                    alt={member.name}
                                    loading='lazy'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}