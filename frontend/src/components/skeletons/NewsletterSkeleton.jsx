import React from 'react';
import Skeleton from '../ui/Skeleton/Skeleton';
import Container from '../layout/Container';

const NewsletterSkeleton = () => {
    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <Container size="sm">
                <div className="text-center flex flex-col items-center">
                    <Skeleton className="h-8 w-64 mb-8" />

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto mb-4">
                        <Skeleton className="flex-1 h-[50px] rounded-full" />
                        <Skeleton className="w-32 h-[50px] rounded-[4px]" />
                    </div>

                    <Skeleton className="h-4 w-48" />
                </div>
            </Container>
        </section>
    );
};

export default NewsletterSkeleton;
