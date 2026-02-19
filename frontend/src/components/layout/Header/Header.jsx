import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../ui/Button';
import { nav } from '../../../constants/content';
import logo from '../../../assets/logo/Attributics-Wordmark.png';
import Block from '../Block/Block';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

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
        <header className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <Block xpad='5%' height='auto'>
            <div className="bg-white/70 backdrop-blur-xl border border-[#858E9B] rounded-lg transition-all duration-300 p-2.5 flex items-center w-full justify-between ring-1 ring-black/5 h-15 relative flex items-center w-full h-15">
                {/* Logo Section */}
                <div className="flex-1 flex justify-start">
                    <Link to="/">
                        <img src={logo} alt="Attributics Logo" className="w-50 h-auto" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {nav.links.map((link) => {
                        // Check if it's a route or anchor link
                        const isRoute = link.href === '/' || link.href === '/about' || link.href === '/resources' || link.href === '/careers';
                        const isActive = location.pathname === link.href;

                        return isRoute ? (
                            <Link
                                key={link.label}
                                to={link.href}
                                className={`header-link ${isActive ? 'active' : ''}`}>
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
                        <Link to="/contact">
                            <Button
                                variant="primary"
                                size="sm"
                                className="bg-black text-white hover:bg-gray-900 rounded-lg px-6 py-2 text-sm font-semibold transition-colors"
                            >
                                {nav.cta.contact}
                            </Button>
                        </Link>
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
                        {nav.links.map((link) => {
                            const isRoute = link.href === '/' || link.href === '/about' || link.href === '/resources' || link.href === '/careers';
                            const isActive = location.pathname === link.href;

                            return isRoute ? (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`font-mono text-[14px] font-normal uppercase leading-[100%] tracking-[0%] px-2 py-1 cursor-pointer transition-colors ${isActive
                                        ? 'text-[#F5614D] font-semibold'
                                        : 'text-[#131212] hover:text-gray-900'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="font-mono text-[14px] font-normal text-[#131212] hover:text-gray-900 uppercase leading-[100%] tracking-[0%] px-2 py-1 cursor-pointer transition-colors"
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="primary" size="sm" className="w-full justify-center bg-black rounded-lg text-white">
                                    {nav.cta.contact}
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </Block>
        </header>
    );
};

export default Header;
