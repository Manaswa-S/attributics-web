import { useState } from 'react';
import Button from '../../ui/Button';
import { siteContent } from '../../../constants/content';
import logo from '../../../assets/logo/Exclude.svg';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { brand, nav } = siteContent;

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-[20px] lg:top-[47px] left-0 right-0 z-50 flex justify-center px-4">
            <div className="bg-white/70 backdrop-blur-xl border border-[#858E9B] rounded-[12px] shadow-lg hover:shadow-xl transition-all duration-300 p-2 lg:p-[10px] flex items-center max-w-[600px] w-full justify-between ring-1 ring-black/5 h-[50px] lg:h-[60px]">

                {/* Logo Section */}
                <a href="/" className="flex items-center gap-2 lg:gap-2.5 ml-2 lg:ml-0">
                    <img src={logo} alt="Attributics Logo" className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span className="text-base lg:text-lg font-normal text-gray-700 tracking-tight lowercase">
                        {brand.name}
                    </span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                    {nav.links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-[11px] font-bold text-gray-600 hover:text-gray-900 uppercase tracking-wider transition-colors cursor-pointer"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA Section */}
                <div className="flex items-center gap-2 lg:gap-4">
                    <div className="hidden md:block">
                        <Button
                            variant="primary"
                            size="sm"
                            className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-6 py-2.5 text-sm font-medium"
                        >
                            {nav.cta.demo}
                        </Button>
                    </div>

                    {/* Mobile Menu Button - Visible mainly on small screens */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900 mr-1"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 lg:hidden">
                    <nav className="flex flex-col gap-4">
                        {nav.links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-sm font-semibold text-gray-600 hover:text-gray-900 uppercase tracking-wide px-2 py-1 cursor-pointer"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <Button variant="primary" size="sm" className="w-full justify-center bg-gray-900 rounded-lg">
                                {nav.cta.demo}
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
