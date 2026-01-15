import Container from '../Container';
import { siteContent } from '../../../constants/content';

import logo from '../../../assets/logo/Exclude.svg';

const Footer = () => {
    const { brand, footer } = siteContent;

    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <Container>
                <div className="py-8 lg:py-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
                        {/* Logo & Copyright */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                            <a href="/" className="flex items-center gap-2">
                                <img src={logo} alt={brand.name} className="h-6 w-auto" />
                                <span className="text-lg font-bold text-gray-900">{brand.name}</span>
                            </a>
                            <span className="hidden sm:inline text-gray-300">|</span>
                            <span className="text-sm text-gray-500">{footer.copyright}</span>
                        </div>

                        {/* Links */}
                        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            {footer.links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
