import Block from "../../components/layout/Block";

const sections = [
    {
      number: "01",
      title: "What Information We Collect",
      content: "When you interact with us or request a project audit, we may collect the following information:",
      list: [
        "Name and job title",
        "Contact information, including email address and phone number",
        "Company name and project details (e.g., current MarTech stack, CRO goals)",
        "Other information relevant to customer surveys, offers, or service inquiries",
      ],
    },
    {
      number: "02",
      title: "What We Do Not Collect",
      content:
        "We focus on digital strategy and data solutions, not financial processing. We do not collect sensitive financial data such as credit card details or bank account passwords through our website.",
    },
    {
      number: "03",
      title: "How We Collect Information",
      content:
        "We collect information whenever you interact with us — when you fill out a lead form, request a MarTech audit, register for newsletters, or contact us directly. We may also receive information from third-party platforms like LinkedIn, provided you have given them permission to share your data.",
    },
    {
      number: "04",
      title: "How We Use the Information",
      content: "We use your information to understand your business needs and deliver high-quality services:",
      list: [
        "Internal record keeping — managing client relationships and project scopes.",
        "Service improvement — enhancing our analytics, Agentic AI, and CEP offerings.",
        "Communication — sending updates on digital strategies and services relevant to your business.",
        "Customization — tailoring our website and proposals to your specific interests.",
      ],
    },
    {
      number: "05",
      title: "Disclosure & Confidentiality",
      content:
        "Attributics does not sell, lease, or distribute your personal information to third parties unless we have your explicit permission or are required by law. We may disclose information to law enforcement or courts in India where legally mandated. Our website may link to external platforms — we are not responsible for their privacy practices.",
    },
    {
      number: "06",
      title: "Security",
      content:
        "We have put in place physical, electronic, and managerial procedures to safeguard the information we collect. We are committed to ensuring your data is secure against unauthorized access or disclosure.",
    },
    {
      number: "07",
      title: "Cookies",
      content:
        "We use traffic log cookies to identify which pages are being used and to improve our website experience. Cookies do not give us access to your computer or personal information beyond what you share. You can accept or decline cookies through your browser settings at any time.",
    },
    {
      number: "08",
      title: "Grievance Redressal",
      content:
        "If you have any concerns about the processing of your personal data, please contact our Grievance Officer. We aim to investigate and respond within 15 working days.",
      contact: true,
    },
    {
      number: "09",
      title: "Access & Correction",
      content: (
        <>
          You have the right to request, correct, or delete the personal information we hold about you at any time. Email us at{" "}
          <a href="mailto:hello@attributics.com" className="text-[#FF5A36] hover:underline">
            hello@attributics.com
          </a>
          .
        </>
      ),
    },
  ];
  
  const Policies = () => {
    return (
        <Block xpad="larger" topMargin="small">
            <div className="min-h-screen">
        
                {/* Header */}
                <div className="mb-4 pb-0 border-b border-slate-200">
                    <span className=" section-eyebrow text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-4 block">
                    Legal
                    </span>
                    <h1 className="section-title text-4xl md:text-5xl font-display font-bold text-slate-900 mb-2">
                    Privacy Policy
                    </h1>
                </div>
        
                {/* Intro */}
                <p className="section-description  text-slate-600 leading-relaxed mb-16 text-base">
                    At <span className="font-semibold text-slate-900">Attributics</span>  (www.attributics.com), we are committed to ensuring that your privacy is protected. This Privacy Policy outlines how we collect, use, disclose, and safeguard your Personal Information when you visit our website or engage with our MarTech, data engineering, and digital strategy services.
                    <br />
                    <br />
                    This policy is governed by the laws of India, including the Information Technology Act, 2000, and the Digital Personal Data Protection (DPDP) Act, 2023.
                    <br />
                </p>
        
                {/* Sections */}
                <div className="space-y-12">
                    {sections.map((section) => (
                    <div key={section.number} className="flex gap-8 group">
                        {/* Number */}
                        <div className="shrink-0 w-10 text-right">
                            <span className="section-eyebrow text-xs font-bold text-slate-300 tracking-widest">
                                {section.number}
                            </span>
                        </div>
        
                        {/* Divider */}
                        <div className="shrink-0 bg-slate-200 group-first:bg-[#FF5A36]" />
        
                        {/* Content */}
                        <div className="pb-12 flex-1">
                        <h2 className="section-title !text-lg font-bold text-slate-900 mb-3">
                            {section.title}
                        </h2>
                        <p className="section-description !text-slate-500 leading-relaxed text-sm mb-4">
                            {section.content}
                        </p>
                        {section.list && (
                            <ul className="space-y-2 mt-3">
                            {section.list.map((item, i) => (
                                <li key={i} className="section-description flex items-start gap-3 !text-lg !text-slate-500">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#FF5A36] shrink-0" />
                                {item}
                                </li>
                            ))}
                            </ul>
                        )}
                        {section.contact && (
                            <div className="section-description mt-4 p-4 bg-white rounded-xl border border-slate-100 !text-lg  space-y-1">
                                <p>
                                    <span className="font-semibold text-slate-700">Email: </span>
                                    <a href="mailto:hello@attributics.com" className="!text-slate-500 hover:underline">
                                        hello@attributics.com
                                    </a>
                                </p>
                                <p>
                                    <span className="font-semibold text-slate-700">Address: </span>
                                    <a href="#google-map-address-link" className="!text-slate-500 hover:underline">
                                        Pune, Maharashtra, India
                                    </a>
                                </p>
                            </div>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Block>
    );
  };
  
  export default Policies;