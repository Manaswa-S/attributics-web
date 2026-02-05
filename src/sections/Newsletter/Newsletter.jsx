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
        <section className="py-16 lg:py-24 bg-[#1a1a1a]">
            <Container size="sm">
                <div className="text-center">
                    {/* LinkedIn Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-[#1a1a1a] font-bold">
                            in
                        </div>
                    </div>

                    <h2 className="text-[32px] lg:text-[40px] font-normal leading-[140%] text-white mb-8">
                        {newsletter.headline}
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={newsletter.placeholder}
                            className="flex-1 px-5 py-3 bg-[#2a2a2a] border border-[#444] rounded-[6px] text-white placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#FF6758] transition-all"
                            required
                        />
                        <button 
                            type="submit"
                            className="px-6 py-3 h-[48px] bg-[#FF6758] text-white text-[14px] font-medium rounded-[6px] hover:bg-[#ff5644] transition-colors whitespace-nowrap"
                        >
                            {newsletter.cta}
                        </button>
                    </form>

                    <p className="text-[12px] text-[#999]">
                        {newsletter.disclaimer}
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default Newsletter;
