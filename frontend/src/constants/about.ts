// VISION & MISSION
import VissionMissionImg from '../assets/team/group/whoAreWe.png';
import WhoAreWeImg from '../assets/team/group/visionMission.png';

export const vision = {
    whoAreWe: {
        eyebrow: 'who are we',
        headline: 'Turning Customer',
        highlightedText: 'Signals Into Growth',
        description: [
            "Attributics is a customer lifecycle–focused growth partner for enterprise brands.",
            "We help organizations transform scattered customer data, fragmented journeys, and complex Martech stacks into cohesive, intelligence-led lifecycle systems , built to drive measurable business impact.",
        ],
        image: WhoAreWeImg
    },

    statement: {
        normal: "Sustainable growth is engineered at the intersection of data, automation, and lifecycle intelligence.",
        highlighted: "",
    },

    vissionMission: {
        eyebrow: 'mission & vision',
        vision: {
            headline: 'Vision',
            description: 'To empower leading brands to turn data, technology, and marketing into lasting customer lifetime value — through intelligence, automation, and operational clarity.',
        },
        mission: {
            headline: 'Mission',
            description: [
                "We embed lifecycle intelligence into existing Martech ecosystems, without requiring brands to rebuild from scratch.",
                "We help enterprises:",
            ],
            points: [
                "Unify customer data into a 360° view",
                "Optimize lifecycle journeys across channels",
                "Enable real-time segmentation and personalization",
                "Improve retention, conversion, and LTV",
                "Drive measurable ROI from existing technology investments",
            ],
        },
        image: VissionMissionImg
    },
}

// METRICS CARDS
export const metricCards = [
    { metric: 20, unit: "%", postive: true, subheadline: "Peak Revenue Growth" },
    { metric: 50, unit: "%", postive: true, subheadline: "CRM-Driven Uplift" },
    { metric: 15, unit: "%", postive: true, subheadline: "Customer Lifetime Value" },
    { metric: 3, unit: "X", postive: true, subheadline: "Faster Execution" }
]

// TEAM MEMBERS
import VishalA from '../assets/team/VishalA.png';
import ShreyaM from '../assets/team/ShreyaM.png';
import ShashankK from '../assets/team/ShashankK.png';
import VakeshS from '../assets/team/VakeshS.png';
import PrasadP from '../assets/team/PrasadP.png';
import MudarB from '../assets/team/MudarB.png';
import NeelS from '../assets/team/NeelS.png';
import MadhuriK from '../assets/team/MadhuriK.png';
import SaumyaS from '../assets/team/SaumyaS.png';
import AniketP from '../assets/team/AniketP.png';
import PoonamA from '../assets/team/PoonamA.png';
import PrathamS from '../assets/team/PrathamS.png';
import AniyaK from '../assets/team/AniyaK.png';
import SaiR from '../assets/team/SaiR.png';
import VaishnaviR from '../assets/team/VaishnaviR.png';
import GauravB from '../assets/team/GauravB.png';
import AkashS from '../assets/team/AkashS.png';
import KanishkaD from '../assets/team/KanishkaD.png';

import PlaceHolder from '../assets/team/placeholder.png';

export const team = {
    eyebrow: 'Our Team',
    headline: 'Meet Our',
    highlighted: 'Team',
    members: [
        {
            id: 1,
            fname: 'Vishal',
            lname: 'Agarwal',
            role: 'Growth',
            img: VishalA,
        },
        {
            id: 2,
            fname: 'Shreya',
            lname: 'Mehta',
            role: 'Operations',
            img: ShreyaM,
        },
        {
            id: 3,
            fname: 'Shashank',
            lname: 'Kumar',
            role: 'Strategy',
            img: ShashankK,
        },
        {
            id: 4,
            fname: 'Vakesh',
            lname: 'Singh',
            role: 'Delivery',
            img: VakeshS,
        },
        {
            id: 5,
            fname: 'Prasad',
            lname: 'Parvatkar',
            role: 'Technology',
            img: PrasadP,
        },
        {
            id: 6,
            fname: 'Mudar',
            lname: 'Bharmal',
            role: 'Growth',
            img: MudarB,
        },
        {
            id: 7,
            fname: 'Neel',
            lname: 'Shah',
            role: 'Operations',
            img: NeelS,
        },
        {
            id: 8,
            fname: 'Madhuri',
            lname: 'Kurhade',
            role: 'Strategy',
            img: MadhuriK,
        },
        {
            id: 9,
            fname: 'Saumya',
            lname: 'Sharma',
            role: 'Marketing',
            img: SaumyaS,
        },
        {
            id: 10,
            fname: 'Aniket',
            lname: 'Pholane',
            role: 'Operations',
            img: AniketP,
        },
        {
            id: 11,
            fname: 'Poonam',
            lname: 'Adak',
            role: 'Operations',
            img: PoonamA,
        },
        {
            id: 12,
            fname: 'Akash',
            lname: 'Sahu',
            role: 'Technology',
            img: AkashS,
        },
        {
            id: 13,
            fname: 'Pratham',
            lname: 'Sharma',
            role: 'Technology',
            img: PrathamS,
        },
        {
            id: 14,
            fname: 'Aniya',
            lname: 'Kulkarni',
            role: 'Operations',
            img: AniyaK,
        },
        {
            id: 15,
            fname: 'Sai',
            lname: 'Reddy',
            role: 'Operations',
            img: SaiR,
        },
        {
            id: 16,
            fname: 'Kaniska',
            lname: 'Deshmukh',
            role: 'Operations',
            img: KanishkaD,
        },
        {
            id: 17,
            fname: 'Vaishnavi',
            lname: 'Raut',
            role: 'Operations',
            img: VaishnaviR,
        },
        {
            id: 18,
            fname: 'Gaurav',
            lname: 'Bajaj',
            role: 'Operations',
            img: GauravB,
        },
    ],
}

// GET STARTED CTA
export const getstarted = {
    eyebrow: 'Ready to Transform Your Growth?',
    headline: [
        'Add Intelligence.',
        'Unlock',
    ],
    highlighted: [
        'Retention',
        'Revenue',
        'Engagement',
        'Conversion'
    ],
    description: "Book a personalized demo with our experts and see how Attributics can revolutionize your customer lifecycle marketing.",
    ctaText: 'Schedule Your Demo',
}