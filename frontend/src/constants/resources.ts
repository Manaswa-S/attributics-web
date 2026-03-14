export const resourcesData = {
    hero: {
        eyebrow: 'RESOURCES',
        headline: 'Insights, Ideas & Impact',
        description:
            'Explore our latest thinking on AI-powered marketing, retention strategies, and revenue growth. From deep-dive blogs to real-world case studies.',
    },
};

export interface CaseStudy {
    id: string;
    title: string;
    subtitle: string;
    client: string;
    role: string;
    timeline: string;
    platform: string;
    industry: string;
    heroImage: string;
    challenge: string;
    solution: string;
    process: { title: string; description: string }[];
    results: { metric: string; value: string }[];
    images: string[];
}

export const caseStudies: CaseStudy[] = [
    {
        id: "fintech-app",
        title: "Redesigning the Future of Personal Finance",
        subtitle: "A complete overhaul of a legacy banking app to improve user engagement and simplify complex financial data.",
        client: "Nova Bank",
        role: "Lead Product Designer",
        timeline: "6 Months",
        platform: "iOS & Android",
        industry: "Real Estate",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        challenge: "Nova Bank's existing mobile application was outdated, cluttered, and suffered from a high drop-off rate during the onboarding process. Users found it difficult to track their spending and understand their financial health.",
        solution: "We introduced a minimalist, intuitive interface that prioritizes essential information. By implementing a new dashboard with clear data visualizations and a streamlined onboarding flow, we made financial management accessible and engaging.",
        process: [
            {
                title: "Research & Discovery",
                description: "Conducted user interviews and analyzed existing app analytics to identify key pain points and user behaviors."
            },
            {
                title: "Wireframing & Prototyping",
                description: "Created low-fidelity wireframes to establish the new information architecture, followed by interactive high-fidelity prototypes."
            },
            {
                title: "User Testing",
                description: "Iterated on the designs based on feedback from 50+ beta testers, refining the navigation and data visualization components."
            }
        ],
        results: [
            { metric: "Increase in Daily Active Users", value: "45%" },
            { metric: "Reduction in Onboarding Time", value: "60%" },
            { metric: "App Store Rating Improvement", value: "4.8" }
        ],
        images: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=1470&auto=format&fit=crop"
        ]
    },
    {
        id: "eco-commerce",
        title: "Sustainable Shopping Made Simple",
        subtitle: "An e-commerce platform dedicated to eco-friendly products, focusing on transparency and seamless checkout.",
        client: "GreenLife",
        role: "UX/UI Designer",
        timeline: "4 Months",
        platform: "Web",
        industry: "Real Estate",
        heroImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop",
        challenge: "GreenLife needed a digital storefront that reflected their core values of sustainability while providing a frictionless shopping experience. Their previous site had a high cart abandonment rate.",
        solution: "Designed a clean, modern e-commerce experience with a focus on product storytelling. We simplified the checkout process to a single page and highlighted the environmental impact of each purchase.",
        process: [
            {
                title: "Brand Alignment",
                description: "Developed a design system that aligned with GreenLife's earthy and minimalist brand identity."
            },
            {
                title: "Journey Mapping",
                description: "Mapped out the customer journey to identify areas of friction, particularly in the product discovery and checkout phases."
            },
            {
                title: "Visual Design",
                description: "Created high-fidelity mockups emphasizing large, high-quality imagery and clear typography."
            }
        ],
        results: [
            { metric: "Increase in Conversion Rate", value: "32%" },
            { metric: "Decrease in Cart Abandonment", value: "25%" },
            { metric: "Growth in Organic Traffic", value: "50%" }
        ],
        images: [
            "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
        ]
    }
];
