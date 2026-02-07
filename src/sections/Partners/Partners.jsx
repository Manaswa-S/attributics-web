import Container from '../../components/layout/Container';
import unionBg from '../../assets/Union.svg';
import attributicsLogo from '../../assets/logo/attributics_logo.png';
import aws from '../../assets/brands/aws.svg';
import clevertap from '../../assets/brands/clevertap.svg';
import americana from '../../assets/brands/americana.svg';
import tableau from '../../assets/brands/tableau.svg';
import powerbi from '../../assets/brands/powerbi.svg';
import azure from '../../assets/brands/azure.svg';
import databricks from '../../assets/brands/databricks.svg';

// Row 1
const row1 = [
    { name: 'AWS', logo: aws },
    { name: 'CleverTap', logo: clevertap },
    { name: 'Americana', logo: americana },
    { name: 'Tableau', logo: tableau },
];

// Row 2
const row2 = [
    { name: 'Power BI', logo: powerbi },
    { name: 'Microsoft Azure', logo: azure },
    { name: 'AWS', logo: aws },
    { name: 'Databricks', logo: databricks },
];

const bottomLeft = { name: 'CleverTap', logo: clevertap };
const bottomRight = { name: 'Americana', logo: americana };

const Partners = () => {
    return (
        <section className="relative pt-2 pb-32 sm:pt-4 sm:pb-40 lg:pt-6 lg:pb-48 overflow-hidden bg-white">
            <div className="relative w-full">
                <Container>

                    <div className="relative w-full min-h-125 lg:h-150 flex items-end justify-center">

                        {/* Dotted Mask Background */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div
                                className="absolute inset-0"
                                style={{
                                    WebkitMaskImage: `url(${unionBg})`,
                                    maskImage: `url(${unionBg})`,
                                    WebkitMaskSize: 'cover',
                                    maskSize: 'cover',
                                    background:
                                        'linear-gradient(180deg, #FFFFFF 0%, #FFB5AC 50%, #FF6758 100%)',
                                }}
                            />

                            {/* Top Fade */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 20%, rgba(255,255,255,0) 50%)',
                                }}
                            />
                        </div>

                        {/* Outer Glass Card - positioned at bottom */}
                        <div
                            className="absolute z-10 rounded-t-[10px] border-t border-r border-l flex flex-col items-center"
                            style={{
                                width: '989px',
                                height: '351px',
                                bottom: '9px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                maxWidth: '95%',
                                background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.1) 105.18%)',
                                backdropFilter: 'blur(4px)',
                                WebkitBackdropFilter: 'blur(4px)',
                                borderColor: '#C1C1C1',
                                borderStyle: 'solid',
                                borderWidth: '1px 1px 0px 1px',
                            }}
                        >
                            <div className="w-full px-8 sm:px-12 lg:px-16 pt-8 lg:pt-10 pb-0">

                                {/* Row 1 */}
                                <div className="grid grid-cols-4 gap-y-4 mb-6">
                                    {row1.map((p, i) => (
                                        <div key={i} className="flex justify-center py-4">
                                            <img
                                                src={p.logo}
                                                alt={p.name}
                                                className="h-6 w-auto max-w-27.5 object-contain filter grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-4 gap-y-4 mb-9">
                                    {row2.map((p, i) => (
                                        <div key={i} className="flex justify-center py-4">
                                            <img
                                                src={p.logo}
                                                alt={p.name}
                                                className="h-6 w-auto max-w-27.5 object-contain filter grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom Center Row */}
                                <div className="w-full flex items-center justify-between pb-0 pt-1">
                                    <div className="w-25 flex justify-center">
                                        <img
                                            src={bottomLeft.logo}
                                            alt={bottomLeft.name}
                                            className="h-5 max-w-22.5 object-contain filter grayscale opacity-40"
                                        />
                                    </div>

                                    <div
                                        className="flex-1 mx-4 flex items-center justify-center rounded-t-[10px] border-t border-r border-l"
                                        style={{
                                            width: '593px',
                                            maxWidth: '593px',
                                            height: '134px',
                                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 95.81%)',
                                            backdropFilter: 'blur(4px)',
                                            WebkitBackdropFilter: 'blur(4px)',
                                            borderColor: '#C1C1C1',
                                            borderStyle: 'solid',
                                            borderWidth: '1px 1px 0px 1px',
                                        }}
                                    >
                                        <img
                                            src={attributicsLogo}
                                            alt="Attributics"
                                            className="h-10 w-auto object-contain"
                                        />
                                    </div>

                                    <div className="w-25 flex justify-center">
                                        <img
                                            src={bottomRight.logo}
                                            alt={bottomRight.name}
                                            className="h-5 max-w-22.5 object-contain filter grayscale opacity-40"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </Container>
            </div>
        </section>
    );
};

export default Partners;
