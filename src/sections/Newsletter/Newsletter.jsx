import { useState } from 'react';
import Container from '../../components/layout/Container';
import Button from '../../components/ui/Button';
import { siteContent } from '../../constants/content';

const Newsletter = () => {
    const { newsletter } = siteContent;
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Subscribing:', email);
        setEmail('');
    };

    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <Container size="sm">
                <div className="text-center">
                    <h2 className="text-headline text-gray-900 mb-8">
                        {newsletter.headline}
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={newsletter.placeholder}
                            className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                            required
                        />
                        <Button type="submit" variant="primary">
                            {newsletter.cta}
                        </Button>
                    </form>

                    <p className="mt-4 text-sm text-gray-500">
                        {newsletter.disclaimer}
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default Newsletter;
