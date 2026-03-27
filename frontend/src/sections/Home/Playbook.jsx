import { motion } from "motion/react";
import { ArrowRight, Workflow, Database, Users, BarChart3, Zap, Navigation, Utensils } from "lucide-react";
import Block from "../../components/layout/Block";
import { useEffect, useRef, useState } from "react";
import { playbook } from "../../constants/home";
import { useNavigate } from "react-router-dom";
import ScrollFade from "../../components/ScrollFade/ScrollFade";
import { typography } from "../../constants/global";

const ICONS = {
  workflow: Workflow,
  database: Database,
  users: Users,
  barChart3: BarChart3,
  zap: Zap,
  navigation: Navigation,
  utensils: Utensils,
};

const playbookCardBadgeSize = "clamp(0.75rem, 0.69rem + 0.22vw, 0.8rem)";
const CARD_PRESET_BY_INDUSTRY = {
  Automotive: {
    icon: "workflow",
    color: "!text-indigo-600",
    bgColor: "bg-indigo-50",
    lineColor: "bg-indigo-500",
    borderColor: "hover:border-indigo-200",
  },
  D2C: {
    icon: "database",
    color: "!text-cyan-600",
    bgColor: "bg-cyan-50",
    lineColor: "bg-cyan-500",
    borderColor: "hover:border-cyan-200",
  },
  Insurance: {
    icon: "users",
    color: "!text-emerald-600",
    bgColor: "bg-emerald-50",
    lineColor: "bg-emerald-500",
    borderColor: "hover:border-emerald-200",
  },
  FinTech: {
    icon: "barChart3",
    color: "!text-purple-600",
    bgColor: "bg-purple-50",
    lineColor: "bg-purple-500",
    borderColor: "hover:border-purple-200",
  },
  Travel: {
    icon: "navigation",
    color: "!text-blue-600",
    bgColor: "bg-blue-50",
    lineColor: "bg-blue-500",
    borderColor: "hover:border-blue-200",
  },

  FoodTech: {
    icon: "utensils",
    color: "!text-orange-600",
    bgColor: "bg-orange-50",
    lineColor: "bg-orange-500",
    borderColor: "hover:border-orange-200",
  },
};

const FALLBACK_PRESET = {
  icon: "zap",
  color: "!text-orange-600",
  bgColor: "bg-orange-50",
  lineColor: "bg-orange-500",
  borderColor: "hover:border-orange-200",
};

const Playbook = () => {
  const [cards, setCards] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/content/built/blinded/meta.json")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted || !Array.isArray(data)) return;

        const mapped = data.map((item, index) => {
          const industry = item.industry;
          return {
            id: item.slug ?? `${index}`,
            category: industry,
            watermark: industry,
            title: item.title ?? "",
            description: item.subtitle ?? item.role ?? "",
            readMoreLink: item.slug
              ? `/resources/case-study/${item.slug}?from=home&type=blinded`
              : null,
          };
        });

        setCards(mapped);
      })
      .catch((err) => {
        console.error("Failed to load playbook cards", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
              {playbook.eyebrow}
            </p>
            <h2 className="section-title" style={typography.title.XXL}>
              {playbook.headline} <br />
              <span className="highlight">{playbook.highlighted}</span>
            </h2>
          </motion.div>
        </div>

        <div className="relative w-full z-10 h-full">
            <div className="relative">
                
                <ScrollFade targetRef={scrollRef} fadeSize={32} />

                <div
                ref={scrollRef}
                className="pt-12 pb-22 flex items-stretch overflow-y-hidden overflow-x-auto snap-x snap-mandatory gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                {cards.map((item, idx) => (
                    <PlaybookCard key={`${item.id}-${idx}`} item={item} idx={idx} />
                ))}
                </div>

            </div>
        </div>
    </section>
    </Block>
  );
};


const PlaybookCard = ({ item, idx }) => {
  const navigate = useNavigate();
  const preset = CARD_PRESET_BY_INDUSTRY[item.category] ?? FALLBACK_PRESET;
  const Icon = ICONS[preset.icon] ?? Zap;

  return (
    <motion.div
      initial={{ opacity: 0.8, y: 3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      onClick={() => item.readMoreLink && navigate(item.readMoreLink)}
      className={`
        w-[75vw] sm:w-90 md:w-90 lg:w-90
        shrink-0 snap-center
        relative group cursor-pointer
        bg-white rounded-[2rem] p-7
        flex flex-col
        border border-slate-100
        shadow-[0_4px_20px_rgb(0,0,0,0.03)]
        hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]
        transition-all duration-500 hover:-translate-y-2
        overflow-hidden
        ${preset.borderColor}
      `}
    >
      {/* Background number watermark */}
      <div className="absolute -right-4 -top-4 lg:text-[8rem] text-[7rem] font-display font-black text-slate-100/70 group-hover:text-slate-100/100 transition-colors duration-500 pointer-events-none z-0 select-none leading-none">
        0{idx + 1}
      </div>

      {/* Bottom accent line on hover */}
      <div className={`absolute bottom-0 left-0 h-1.5 w-0 ${preset.lineColor} group-hover:w-full transition-all duration-700 ease-out z-20`} />

      <div className="relative z-10 flex flex-col h-full gap-8">
        {/* Top row: icon + category badge */}
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-2xl ${preset.bgColor} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-sm shrink-0`}>
            <Icon className={`w-6 h-6 ${preset.color}`} />
          </div>
          <span className="inline-flex px-3 py-1 rounded-full section-eyebrow bg-slate-100 shrink-0" style={{ fontSize: playbookCardBadgeSize, fontWeight: 500 }}>
            {item.category}
          </span>
        </div>

        {/* Text content — grows naturally */}
        <div className="flex flex-col gap-6 flex-1">
          <h3 className="section-title" style={typography.title.SM}>
            {item.title}
          </h3>
          <p className="section-description" style={typography.desc.Smaller}>
            {item.description}
          </p>
        </div>

        {/* CTA — always pinned to bottom */}
        <div className="pt-2 border-t border-slate-100">
          <div className={`inline-flex items-center gap-2 section-description ${preset.color}`} style={typography.desc.Bold}>
            <p>Read More</p>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Playbook;
