
const AuditCTA = () => {
    return (
        <section className="w-full">
            <div
                className="
                bg-white
                border
                border-[#CFCFCF]
                rounded-[24px]
                px-6
                py-8
                sm:px-10
                sm:py-10
                lg:px-16
                lg:py-14
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
                lg:justify-between

                "
            >
                {/* Left Content */}
                <div className="max-w-3xl">
                    <p className="text-[14px] uppercase tracking-wide text-black font-ibm-mono mb-3">
                        Ready to get started?
                    </p>

                    <h2 className="text-[24px] sm:text-[28px] lg:text-[36px] font-normal leading-[130%] text-black">
                        Get a free audit for an intelligent layer for your martech stack.
                    </h2>
                </div>

                {/* CTA Button */}
                <div className="flex-shrink-0">
                    <button
                        className="
                        bg-black
                        text-white
                        px-6
                        py-4
                        rounded-[10px]
                        text-[16px]
                        font-medium
                        flex
                        items-center
                        gap-3
                        hover:opacity-90
                        transition
                        w-full
                        lg:w-auto
                        justify-center
                        "
                    >
                        Book an audit
                        <span className="text-xl">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
  };
  
  export default AuditCTA;
  