import Block from '../Block/Block';
import { brand, footer, newsletter } from '../../../constants/other';
import logo from '../../../assets/logo/Exclude.svg';

const links = [
    {
        group: 'Company',
        items: [
            { label: 'About', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Blog', href: '#' },
        ],
    },
    {
        group: 'Product',
        items: [
            { label: 'Features', href: '#' },
            { label: 'Pricing', href: '#' },
            { label: 'Docs', href: '#' },
        ],
    }
]

const FooterTwo = () => {

    return (
        <Block xpad='none'>
        <footer className="bg-[#000000] text-white lg:px-50 px-4">

            <div className='flex lg:flex-row flex-col pt-10 gap-12 items-center justify-center'>
                <div className='flex-[1] flex justify-start'>
                    {Links()}
                </div>

                {/* Newsletter Section - Centered */}
                <div className="flex-[1] flex justify-center">
                    <div className="flex flex-col gap-7.5 max-w-132.5 w-full">
                        {/* LinkedIn Icon */}
                        <div className="flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            <span className="text-sm font-medium">LinkedIn</span>
                        </div>

                        {/* Newsletter Heading */}
                        <h2 className="footer-title" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                            {newsletter.headline}
                        </h2>

                        {/* Email Input and Subscribe Button */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder={newsletter.placeholder}
                                className="flex-1 px-4 py-3 bg-transparent border border-white/30 rounded-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 transition-colors"
                            />
                            <button className="px-6 py-3 bg-[#F5614D] hover:bg-[#E8503C] text-white rounded-sm font-medium transition-colors whitespace-nowrap">
                                {newsletter.cta}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="h-[3%] flex justify-center pt-6">
                <div className="border-t border-[#5A5A5A] w-full"></div>
            </div>

            {/* Footer Bottom Section */}
            <div className="h-[37%] flex justify-center pt-6 pb-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 w-full">
                    {/* Logo and Copyright */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <a href="/" className="flex items-center gap-2">
                            <img src={logo} alt={brand.name} className="h-6 w-auto filter brightness-0 invert" />
                            <span className="text-sm font-medium text-white/70">{brand.name}</span>
                        </a>
                        <span className="hidden sm:inline text-white/20">|</span>
                        <span className="text-sm text-white/50">{footer.copyright}</span>
                    </div>

                    {/* Footer Links */}
                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                        {footer.links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-white/50 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
        </Block>
    );
};
const Links = () => {
    return (
      <div className="flex flex-col gap-6 w-full items-center">
        <h3 className="footer-link-title">Links</h3>
  
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 gap-16 text-start">
            {links.map((section) => (
              <div key={section.group} className="flex flex-col gap-3">
                <p className="footer-link-title">{section.group}</p>
  
                {section.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

export default FooterTwo;
