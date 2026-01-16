import React from 'react';
import Skeleton from '../ui/Skeleton/Skeleton';
import Container from '../layout/Container';

const SplitSectionSkeleton = () => {
    return (
        <section className="py-12 lg:py-24 bg-white">
            <Container>
                {/* Main Split Card */}
                <div className="w-full rounded-[14px] border border-gray-100 p-6 lg:p-[40px] flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[513px]">
                    {/* Left Content */}
                    <div className="flex-1 flex flex-col justify-center">
                        <Skeleton className="h-4 w-32 mb-6" />
                        <Skeleton className="h-10 w-3/4 mb-4" />
                        <Skeleton className="h-10 w-1/2 mb-6" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6" />

                        <div className="flex gap-2 mt-8">
                            {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="w-2 h-2 rounded-full" />)}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 rounded-xl overflow-hidden">
                        <Skeleton className="w-full h-full min-h-[300px]" />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default SplitSectionSkeleton;
