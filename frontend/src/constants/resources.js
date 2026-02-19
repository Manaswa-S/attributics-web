/**
 * Resources Data — Blogs & Case Studies
 * 
 * To add new content, simply add a new object to the respective array.
 * Each entry follows this structure:
 * 
 * BLOG:
 * {
 *   id: unique string,
 *   type: 'blog',
 *   title: string,
 *   description: short summary,
 *   category: tag label (e.g. 'AI & Automation', 'MarTech'),
 *   date: 'MMM DD, YYYY',
 *   readTime: 'X min read',
 *   image: URL or imported image,
 *   author: { name, role },
 *   featured: boolean (shows in hero if true),
 * }
 * 
 * CASE STUDY:
 * {
 *   id: unique string,
 *   type: 'case-study',
 *   title: string,
 *   description: short summary,
 *   category: tag label,
 *   client: company name,
 *   result: key metric / outcome,
 *   image: URL or imported image,
 *   date: 'MMM DD, YYYY',
 *   readTime: 'X min read',
 *   featured: boolean,
 * }
 */

export const resourcesData = {
    hero: {
        eyebrow: 'RESOURCES',
        headline: 'Insights, Ideas & Impact',
        description:
            'Explore our latest thinking on AI-powered marketing, retention strategies, and revenue growth. From deep-dive blogs to real-world case studies.',
    },

    filters: ['All', 'Blogs', 'Case Studies'],

    blogs: [
        {
            id: 'blog-1',
            type: 'blog',
            title: 'How Agentic AI is Redefining Customer Retention in 2026',
            description:
                'Discover how autonomous AI agents are transforming retention strategies by predicting churn, personalizing journeys, and driving long-term value.',
            category: 'AI & Automation',
            date: 'Jan 28, 2026',
            readTime: '6 min read',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&q=80',
            author: { name: 'Attributics Team', role: 'Research' },
            featured: true,
        },
        {
            id: 'blog-2',
            type: 'blog',
            title: 'The Composable CDP: Why Flexibility is the Future of Data',
            description:
                'Monolithic CDPs are giving way to composable architectures. Learn why flexibility, modularity, and real-time decisioning matter now.',
            category: 'MarTech',
            date: 'Jan 15, 2026',
            readTime: '5 min read',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80',
            author: { name: 'Attributics Team', role: 'Engineering' },
            featured: false,
        },
        {
            id: 'blog-3',
            type: 'blog',
            title: '5 Cross-Sell Strategies That Actually Work in B2B SaaS',
            description:
                'Move beyond basic recommendations. These data-backed cross-sell strategies help B2B teams unlock expansion revenue at scale.',
            category: 'Revenue Growth',
            date: 'Dec 20, 2025',
            readTime: '4 min read',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80',
            author: { name: 'Attributics Team', role: 'Strategy' },
            featured: false,
        },
        {
            id: 'blog-4',
            type: 'blog',
            title: 'Real-Time Personalization: From Buzzword to Business Impact',
            description:
                'How leading brands are using real-time signals to deliver hyper-personalized experiences that increase engagement and conversions.',
            category: 'Personalization',
            date: 'Dec 5, 2025',
            readTime: '7 min read',
            image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop&q=80',
            author: { name: 'Attributics Team', role: 'Product' },
            featured: false,
        },
    ],

    caseStudies: [
        {
            id: 'cs-1',
            type: 'case-study',
            title: 'Driving Digital Transformation with MarTech in the Automobile Industry',
            description:
                'How a leading automobile manufacturer achieved 11% more organic leads by establishing a Customer 360 view and streamlining marketing touchpoints.',
            category: 'Automobile',
            client: 'Leading Auto Manufacturer',
            result: '11% More Organic Leads',
            image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop&q=80',
            date: 'Jan 10, 2026',
            readTime: '8 min read',
            featured: true,
        },
        {
            id: 'cs-2',
            type: 'case-study',
            title: 'Powering Flexibility with a Composable CDP',
            description:
                'A major automobile manufacturer transitioned to a cloud-based CDP, improving scalability and enabling 10X boosts in conversion rates.',
            category: 'CDP & Data',
            client: 'Global Auto Brand',
            result: '10X Conversion Rate Boost',
            image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&q=80',
            date: 'Dec 15, 2025',
            readTime: '6 min read',
            featured: false,
        },
        {
            id: 'cs-3',
            type: 'case-study',
            title: 'Turning Every Lead into an Opportunity with Data & CRM',
            description:
                'A large life insurance provider used AI-powered lead scoring and CRM workflows to achieve 15% revenue growth and reduce duplication.',
            category: 'Insurance',
            client: 'Leading Insurance Provider',
            result: '15% Revenue Growth',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop&q=80',
            date: 'Nov 28, 2025',
            readTime: '7 min read',
            featured: false,
        },
    ],
};
