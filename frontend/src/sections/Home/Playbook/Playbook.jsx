import { motion } from "motion/react";
import { ArrowRight, Workflow, Database, Users, BarChart3, Zap } from "lucide-react";
import Block from "../../../components/layout/Block";
import { useRef } from "react";
const playbooks = [
  {
    id: "martech",
    category: "Automotive",
    title: "Digital Transformation with Martech",
    description:
      "A leading automobile manufacturer partnered with us to establish a Customer 360 view, streamline touchpoints, and enhance digital sales.",
    icon: Workflow,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    lineColor: "bg-indigo-500",
    borderColor: "hover:border-indigo-200",
  },
  {
    id: "cdp",
    category: "Manufacturing",
    title: "Transition to a Composable CDP",
    description:
      "A major manufacturer transitioned to a cloud-based CDP, improving scalability, reducing costs, and enabling developer-level personalization.",
    icon: Database,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    lineColor: "bg-cyan-500",
    borderColor: "hover:border-cyan-200",
  },
  {
    id: "crm",
    category: "Insurance",
    title: "Boosting Conversions with Data & CRM",
    description:
      "A large life insurance provider used AI-powered lead scoring and CRM workflows to reduce duplication and unlock new revenue streams.",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    lineColor: "bg-emerald-500",
    borderColor: "hover:border-emerald-200",
  },
  {
    id: "data",
    category: "Retail",
    title: "Revolutionizing Data Strategies",
    description:
      "A large retailer revolutionized their data strategy to improve customer engagement and maximize revenue across all digital touchpoints.",
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    lineColor: "bg-purple-500",
    borderColor: "hover:border-purple-200",
  },
  {
    id: "engagement",
    category: "Fintech",
    title: "Accelerating User Engagement",
    description:
      "A leading Fintech platform integrated real-time personalization to deliver hyper-relevant offers, increasing overall user engagement by over 40%.",
    icon: Zap,
    color: "text-[#FF5A36]",
    bgColor: "bg-[#FF5A36]/10",
    lineColor: "bg-[#FF5A36]",
    borderColor: "hover:border-[#FF5A36]/30",
  },
  {
    id: "engagement2",
    category: "Fintech",
    title: "Accelerating User Engagement",
    description:
      "A leading Fintech platform integrated real-time personalization to deliver hyper-relevant offers, increasing overall user engagement by over 40%.",
    icon: Zap,
    color: "text-[#FF5A36]",
    bgColor: "bg-[#FF5A36]/10",
    lineColor: "bg-[#FF5A36]",
    borderColor: "hover:border-[#FF5A36]/30",
  },
  {
    id: "engagement3",
    category: "Fintech",
    title: "Accelerating User Engagement",
    description:
      "A leading Fintech platform integrated real-time personalization to deliver hyper-relevant offers, increasing overall user engagement by over 40%.",
    icon: Zap,
    color: "text-[#FF5A36]",
    bgColor: "bg-[#FF5A36]/10",
    lineColor: "bg-[#FF5A36]",
    borderColor: "hover:border-[#FF5A36]/30",
  },
];

import ScrollFade from "../../../components/ScrollFade/ScrollFade";

const Playbook = () => {

    const scrollRef = useRef(null);
  return (
    <Block xpad="large">
      <section className="relative overflow-hidden">
        <div className="mb-0 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-eyebrow mb-6 block">
              YOUR PLAYBOOK FOR RETENTION
            </p>
            <h2 className=" section-title lg:!text-[3rem]">
              From Manual Campaigns To <br />
              <span className="highlight">Intelligent Automation</span>
            </h2>
          </motion.div>
        </div>

        <div className="relative w-full z-10 h-full">
            <div className="relative">
                
                <ScrollFade targetRef={scrollRef} fadeSize={100} />

                <div
                ref={scrollRef}
                className="pt-12 pb-22 flex items-stretch overflow-y-hidden overflow-x-auto snap-x snap-mandatory gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                {playbooks.map((item, idx) => (
                    <PlaybookCard key={item.id + idx} item={item} idx={idx} />
                ))}
                </div>

            </div>
        </div>
    </section>
    </Block>
  );
};

const PlaybookCard = ({ item, idx }) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0.8, y: 3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`
        w-[75vw] sm:w-60 md:w-70 lg:w-85
        shrink-0 snap-center
        relative group cursor-pointer
        bg-white rounded-[2rem] p-7
        flex flex-col
        border border-slate-100
        shadow-[0_4px_20px_rgb(0,0,0,0.03)]
        hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]
        transition-all duration-500 hover:-translate-y-2
        overflow-hidden
        ${item.borderColor}
      `}
      // No fixed height — card grows with content
    >
      {/* Background number watermark */}
      <div className="absolute -right-4 -top-4 lg:text-[8rem] text-[7rem] font-display font-black text-slate-100/70 group-hover:text-slate-100/100 transition-colors duration-500 pointer-events-none z-0 select-none leading-none">
        0{idx + 1}
      </div>

      {/* Bottom accent line on hover */}
      <div className={`absolute bottom-0 left-0 h-1.5 w-0 ${item.lineColor} group-hover:w-full transition-all duration-700 ease-out z-20`} />

      <div className="relative z-10 flex flex-col h-full gap-6">
        {/* Top row: icon + category badge */}
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-2xl ${item.bgColor} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-sm shrink-0`}>
            <Icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <span className="inline-flex px-3 py-1 rounded-full section-eyebrow bg-slate-100 shrink-0" style={{fontSize: '0.9rem', fontWeight: '500'}}>
            {item.category}
          </span>
        </div>

        {/* Text content — grows naturally */}
        <div className="flex flex-col gap-3 flex-1">
          <h3 className="section-title" style={{ fontSize: "1.4rem" }}>
            {item.title}
          </h3>
          <p className="section-description" style={{ fontSize: "1.1rem" }}>
            {item.description}
          </p>
        </div>

        {/* CTA — always pinned to bottom */}
        <div className="pt-2 border-t border-slate-100">
          <div className={`inline-flex items-center gap-2 font-bold text-sm ${item.color}`}>
            Read case study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Playbook;