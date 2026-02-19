import { useState } from 'react';
import Container from '../components/layout/Container';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        website: '',
    });
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            // Using FormSpree (replace with your FormSpree endpoint)
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Thank you! We will contact you soon.',
                });
                // Reset form
                setFormData({ fullName: '', email: '', phone: '', website: '' });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Something went wrong. Please try again later.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="pt-40 pb-20 lg:pt-48 lg:pb-28 bg-white min-h-[70vh]">
            <Container>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-20 max-w-5xl mx-auto">
                    {/* Left Side - Text Content */}
                    <div className="flex-1 max-w-md">
                        <p
                            className="uppercase text-xs tracking-[0.2em] text-[#999] mb-4"
                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                            SCHEDULE A CALL
                        </p>
                        <h1
                            className="text-2xl sm:text-3xl lg:text-[32px] font-normal leading-[140%] text-[#131212] mb-4"
                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                        >
                            Get started with your journey.
                        </h1>
                        <p
                            className="text-sm sm:text-base font-normal leading-[160%] text-[#666]"
                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                        >
                            It's the growth that compounds. Intelligent agents continuously optimize engagement, retention, and expansion—turning every customer into a long-term value driver.
                        </p>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="flex-1 w-full max-w-md">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[#D1D5DB] rounded-md text-sm text-[#131212] placeholder:text-[#999] focus:outline-none focus:border-[#131212] transition-colors"
                                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="email@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[#D1D5DB] rounded-md text-sm text-[#131212] placeholder:text-[#999] focus:outline-none focus:border-[#131212] transition-colors"
                                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[#D1D5DB] rounded-md text-sm text-[#131212] placeholder:text-[#999] focus:outline-none focus:border-[#131212] transition-colors"
                                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                            />
                            <input
                                type="url"
                                name="website"
                                placeholder="Website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[#D1D5DB] rounded-md text-sm text-[#131212] placeholder:text-[#999] focus:outline-none focus:border-[#131212] transition-colors"
                                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-2 px-6 py-3 bg-[#F5614D] hover:bg-[#E8503C] text-white text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                            >
                                {isSubmitting ? 'Sending...' : 'Request a consultant'} <span>→</span>
                            </button>

                            {/* Status Message */}
                            {submitStatus.message && (
                                <div
                                    className={`mt-4 p-3 rounded-md text-sm ${submitStatus.type === 'success'
                                            ? 'bg-green-50 text-green-800 border border-green-200'
                                            : 'bg-red-50 text-red-800 border border-red-200'
                                        }`}
                                >
                                    {submitStatus.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ContactPage;
