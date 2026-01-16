import React from 'react';
import Skeleton from '../ui/Skeleton/Skeleton';
import Container from '../layout/Container';

const HeroSkeleton = () => {
    return (
        <section className="relative pt-32 lg:pt-[263px] pb-12 lg:pb-24 overflow-hidden bg-white">
            <Container className="relative z-10 w-full max-w-[1440px]">
                <div className="mx-auto text-center flex flex-col items-center">
                    {/* Eyebrow */}
                    <Skeleton className="h-4 w-32 mb-6 lg:mb-9" />

                    {/* Headline */}
                    <div className="w-full flex flex-col items-center gap-2 mb-8 lg:mb-12">
                        <Skeleton className="h-8 lg:h-10 w-full max-w-[600px]" />
                        <Skeleton className="h-8 lg:h-10 w-full max-w-[400px]" />
                    </div>

                    {/* Hero Image Block */}
                    <Skeleton className="w-full max-w-[1243px] h-[300px] lg:h-[339px] rounded-[20px] mb-8 lg:mb-12" />

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 lg:mb-20 px-4 w-full">
                        <Skeleton className="h-[50px] w-full sm:w-[200px] rounded-[4px]" />
                        <Skeleton className="h-[50px] w-full sm:w-[200px] rounded-[4px]" />
                    </div>

                    {/* Logo Cloud */}
                    <Skeleton className="h-4 w-48 mb-6" />
                    <Skeleton className="h-12 w-full max-w-[800px]" />
                </div>
            </Container>
        </section>
    );
};

export default HeroSkeleton;
