import React from 'react';
import Skeleton from '../ui/Skeleton/Skeleton';
import Container from '../layout/Container';

const TimelineSkeleton = () => {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden min-h-[900px] bg-gray-900">
            <Container className="relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center mb-10 lg:mb-16">
                    <Skeleton className="h-4 w-48 bg-white/10 mb-4" />
                    <Skeleton className="h-6 w-full max-w-[500px] bg-white/10" />
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <Skeleton className="w-14 h-14 rounded-xl bg-white/10" />
                </div>

                {/* Timeline Cards */}
                <div className="w-full max-w-[531px] mx-auto space-y-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-full h-[229px] rounded-[14px] border border-white/10 p-8 bg-white/5">
                            <Skeleton className="h-3 w-24 bg-white/10 mb-4" />
                            <Skeleton className="h-6 w-3/4 bg-white/10 mb-4" />
                            <Skeleton className="h-4 w-full bg-white/10 mb-2" />
                            <Skeleton className="h-4 w-5/6 bg-white/10" />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default TimelineSkeleton;
