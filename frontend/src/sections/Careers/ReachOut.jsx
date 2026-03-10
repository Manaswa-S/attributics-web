import { ArrowRight } from "lucide-react";

const ReachOut = () => {
    return (
        <>
            {/* CTA Section */}
            <section className="container mx-auto px-6 max-w-4xl mb-20 text-center">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 block">
                    WORK WITH US
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 mb-2">
                    Build the <span className="text-[#FF5A36]">Intelligence Layer</span>
                </h2>
                <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 mb-8">
                    Behind Modern Retention.
                </h2>
                <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
                    Build high-performance backend systems, APIs, and scalable infrastructure powering enterprise-grade solutions.
                </p>
                <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-colors inline-flex items-center gap-2 shadow-lg shadow-slate-200">
                    Reach Out To Us <ArrowRight className="w-5 h-5" />
                </button>
            </section>
        </>
    );
};

export default ReachOut;