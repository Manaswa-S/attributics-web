import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import { siteContent } from '../../../constants/content';
import logo from '../../../assets/logo/Exclude.svg';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { brand, nav } = siteContent;

    const handleNavClick = (e, href) => {
        e.preventDefault();
        // If it's an anchor link, scroll to it
        if (href.startsWith('#')) {
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-[47px] left-[62px] right-[62px] z-50 flex justify-center">
            <div className="bg-white/70 backdrop-blur-xl border border-[#858E9B] rounded-[8px] transition-all duration-300 p-[10px] flex items-center w-full max-w-[1315px] justify-between ring-1 ring-black/5 h-[60px]">

                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 lg:gap-2.5 ml-2 lg:ml-0">
                    <img src={logo} alt="Attributics Logo" className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span className="text-base lg:text-lg font-normal text-gray-700 tracking-tight lowercase">
                        {brand.name}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {nav.links.map((link) => {
                        // Check if it's a route or anchor link
                        const isRoute = link.href === '/' || link.href === '/about' || link.href === '/resources' || link.href === '/careers';
                        
                        return isRoute ? (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="font-mono text-[16px] font-normal text-[#131212] hover:text-gray-900 uppercase leading-[100%] tracking-[0%] transition-colors cursor-pointer"
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="font-mono text-[16px] font-normal text-[#131212] hover:text-gray-900 uppercase leading-[100%] tracking-[0%] transition-colors cursor-pointer"
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </nav>

                {/* CTA Section */}
                <div className="flex items-center gap-2 lg:gap-3">
                    <div className="hidden lg:block">
                        <Button
                            variant="primary"
                            size="sm"
                            className="bg-black text-white hover:bg-gray-900 rounded-lg px-6 py-2 text-sm font-semibold transition-colors"
                        >
                            {nav.cta.contact}
                        </Button>
                    </div>

                    {/* Mobile Menu Button - Visible mainly on small screens */}
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 mr-1"
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
                                className="font-mono text-[14px] font-normal text-[#131212] hover:text-gray-900 uppercase leading-[100%] tracking-[0%] px-2 py-1 cursor-pointer transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <Button variant="primary" size="sm" className="w-full justify-center bg-black rounded-lg text-white">
                                {nav.cta.contact}
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
