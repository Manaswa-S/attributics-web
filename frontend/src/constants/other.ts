import Exclude from '../assets/logo/Exclude.svg';
import Wordmark from '../assets/logo/Attributics-Wordmark.png';

export const brand = {
    logo: Exclude,
    wordmark: Wordmark,
    name: 'Attributics',
    tagline: 'AI-Powered Revenue Intelligence',
}

export const nav = {
    links: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
        {
            label: 'Resources',
            href: '/resources',
        },
        { label: 'Careers', href: '/careers' },
    ],
    cta: {
        login: 'Login',
        demo: 'Book a meeting',
        contact: 'Contact Us',
    },
}

export const newsletter = {
    headline: 'Stay ahead with AI intelligence tips for your business growth.',
    placeholder: 'Enter your email',
    cta: 'Subscribe',
    disclaimer: 'No spam. Unsubscribe anytime.',
}

import l from '../components/Icons/linkedin.svg';

export const footer = {
    socials: [
        {
            logo: null,
            name: "LinkedIn",
            href: "",
        }
    ],
    links: [
        {
            title: 'Company',
            items: [
                {
                    label: 'About',
                    href: '/about',
                },
                {
                    label: 'Careers',
                    href: '/careers',
                },
                {
                    label: 'Resources',
                    href: '/resources',
                },
                {
                    label: 'Privacy',
                    href: '/privacy',
                }
            ]
        }
    ],
    copyright: '© 2026 Attributics. All rights reserved.',
}