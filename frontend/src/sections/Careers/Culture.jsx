import { motion } from "motion/react";
import Block from "../../components/layout/Block";

const teams = [
    { name: "Engineering", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" },
    { name: "Design", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" },
    { name: "Marketing", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" },
    { name: "Sales", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800" }
];

const Culture = () => {

    return (
        <>
            <Block xpad="small" topMargin="none">
            {/* Teams/Culture Section */}
            <section className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
                    Our Teams & <span className="text-[#FF5A36]">Culture</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    Discover the people behind the product. We foster a culture of innovation, collaboration, and continuous learning.
                    </p>
                </div>
        
                <div className="relative flex overflow-hidden group">
                    <motion.div
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex items-center gap-6"
                    >
                    {[...teams, ...teams, ...teams, ...teams].map((team, idx) => (
                        <div 
                        key={`${team.name}-${idx}`}
                        className="relative rounded-2xl overflow-hidden h-80 w-[280px] md:w-[400px] flex-shrink-0"
                        >
                        <img src={team.image} alt={team.name} className="w-full h-full object-cover" />
                        </div>
                    ))}
                    </motion.div>
                    
                    {/* Gradient overlays for smooth fade edges */}
                    <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                </div>
            </section>
            </Block>
        </>
    );
};

export default Culture;