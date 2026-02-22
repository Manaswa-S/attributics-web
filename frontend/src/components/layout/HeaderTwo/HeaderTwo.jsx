import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../ui/Button';
import { nav } from '../../../constants/content';
import logo from '../../../assets/logo/Attributics-Wordmark.png';
import Block from '../Block/Block';

const HeaderTwo = () => {
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


    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <header className={`fixed left-0 right-0 z-50 flex justify-center ${isScrolled ? "top-4" : "top-4"}`} >
        <Block xpad='medium'>
            <div
                className={`
                    transition-all duration-300
                    rounded-lg flex items-center w-full justify-between h-15
                    ${
                    isScrolled
                        ? "p-2.5 bg-white/50 backdrop-blur-xl border border-[#858E9B] shadow-lg"
                        : "bg-transparent border border-transparent"
                    }
                `}
            >
                <div className={`flex-1 flex justify-start`}>
                    <Link to="/">
                        <img src={logo} alt="Attributics Logo" className="w-auto h-8" />
                    </Link>
                </div>


                {/* Desktop Navigation */}
                <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">

                    {nav.links.map((link) => {
                        // Check if it's a route or anchor link
                        const splits = link.href.split('/');
                        const baseURL = '/' + splits[1];

                        const isRoute = baseURL === '/' || baseURL === '/about' || baseURL === '/resources' || baseURL === '/careers';
                        const pathNameSplits = location.pathname.split('/');
                        const basePathName = '/' + pathNameSplits[1];
                        const isActive = basePathName === baseURL;

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
                <div className="flex-1 flex justify-end items-center gap-3">

                    <div className="hidden lg:block" style={{color: 'white'}}>
                        <Link to="/contact">
                            <Button
                                variant="primary"
                                className="text-white w-auto h-9 bg-black px-10 py-5 header-button-label rounded-lg"
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

export default HeaderTwo;
