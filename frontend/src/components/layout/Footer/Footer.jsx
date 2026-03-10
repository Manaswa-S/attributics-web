const Footer = () => {
    return (
      <footer className="bg-[#0A0A0A] text-white pt-24 pb-12 border-t border-slate-900">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
  
            {/* Left Column */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                  <div className="w-4 h-4 bg-[#0A0A0A] rounded-sm relative">
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-full translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <span className="text-2xl font-display font-light tracking-[0.2em] uppercase">
                  ATTRIBUTICS
                </span>
              </div>
              <p className="text-slate-400 font-mono text-sm tracking-widest uppercase mb-12">
                AI-POWERED REVENUE INTELLIGENCE
              </p>
              <a href="https://www.linkedin.com/company/attributicslab/" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-6 h-6 grayscale-100 opacity-70" />
                <span className="text-lg">LinkedIn</span>
              </a>
            </div>
  
            {/* Middle Column */}
            <div className="flex flex-col items-start md:items-center">
              <div>
                <h4 className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                  COMPANY
                </h4>
                <ul className="space-y-4 text-slate-400">
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                </ul>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="flex flex-col items-start md:items-end">
              <div>
                <h4 className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                  RESOURCES
                </h4>
                <ul className="space-y-4 text-slate-400 md:text-right">
                  <li><a href="/resources" className="hover:text-white transition-colors">Resources</a></li>
                  <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
  
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Attributics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;