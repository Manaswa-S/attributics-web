import { useState } from 'react';
import Block from '../../../components/layout/Block/Block';
import { MailIcon, MapPinIcon, PhoneIcon } from '../../../components/Icons/Icons';
import {general, formLinks } from '../../../constants/contact';

const ContactForm = () => {
    return (
        <Block xpad='large' topMargin='none'>
            <section className="lg:min-h-screen items-center justify-center flex flex-col lg:justify-around grid grid-cols-1 lg:grid-cols-[3fr_3fr] gap-12 lg:gap-22 lg:mt-0 mt-20">
                {/* Left Side - Text Content */}
                <div className="flex-col flex justify-center align-center">
                    <p className="section-eyebrow">{general.eyebrow}</p>
                    <h1 className="section-title">
                        {general.headline}{' '}
                        <span className='highlight'>{general.highlighted}</span>
                    </h1>
                    <p className="section-description">{general.description}</p>

                    <div className='flex gap-2 mt-4 flex-col'>
                        <div className='items-center flex flex-row gap-2'>
                            <PhoneIcon />
                            <p className='section-description'>{general.details.phone}</p>
                        </div>

                        <div className='items-center flex flex-row gap-2'>
                            <MailIcon />
                            <p className='section-description'>{general.details.email}</p>
                        </div>

                        <div className='items-center flex flex-row gap-2'>
                            <MapPinIcon />
                            <p className='section-description'>{general.details.location}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <Form />
            </section>
        </Block>
    );
};

const Form = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        website: '',
        message: '',
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
            const response = await fetch(formLinks.general, {
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
        <>
            <div className="flex-1 w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full content-description px-4 py-3 border border-[#D1D5DB] rounded-md placeholder:text-[#999] focus:outline-none focus:border-[#131212] transition-colors"
                        style={{ color: 'black' }}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="email@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full content-description px-4 py-3 border border-[#D1D5DB] rounded-md placeholder:text-[#999] focus:outline-none focus:border-[#131212] transition-colors"
                        style={{ color: 'black' }}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full content-description px-4 py-3 border border-[#D1D5DB] rounded-md placeholder:text-[#999] focus:outline-none focus:border-[#131212] transition-colors"
                        style={{ color: 'black' }}
                    />
                    <input
                        type="url"
                        name="website"
                        placeholder="Website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full content-description px-4 py-3 border border-[#D1D5DB] rounded-md placeholder:text-[#999] focus:outline-none focus:border-[#131212] transition-colors"
                        style={{ color: 'black' }}
                    />
                    <textarea
                        type="text"
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full content-description px-4 py-3 border border-[#D1D5DB] rounded-md placeholder:text-[#999] focus:outline-none focus:border-[#131212] transition-colors"
                        style={{ color: 'black' }}
                        rows={8}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="content-description w-full mt-2 px-6 py-3 bg-[#F5614D] hover:bg-[#E8503C] rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </>
    )
}

export default ContactForm;
