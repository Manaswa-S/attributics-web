import React from 'react';
import Skeleton from '../ui/Skeleton/Skeleton';
import Container from '../layout/Container';

const CardGridSkeleton = () => {
    return (
        <section className="py-16 lg:py-24">
            <Container>
                {/* Headline/Header Area */}
                <div className="flex flex-col items-center mb-10 lg:mb-16">
                    <Skeleton className="h-8 w-64 lg:w-96 mb-2" />
                    <Skeleton className="h-4 w-48 lg:w-64" />
                </div>

                {/* Cards Grid */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-[20px]">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-full max-w-[400px] h-[223px] rounded-[16px] overflow-hidden relative">
                            <Skeleton className="w-full h-full" />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default CardGridSkeleton;
