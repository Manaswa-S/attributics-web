import unionBg from '../../assets/Union.svg';
import aws from '../../assets/brands/aws.svg';
import clevertap from '../../assets/brands/clevertap.svg';
import americana from '../../assets/brands/americana.svg';
import tableau from '../../assets/brands/tableau.svg';
import powerbi from '../../assets/brands/powerbi.svg';
import azure from '../../assets/brands/azure.svg';
import databricks from '../../assets/brands/databricks.svg';
import Block from '../../components/layout/Block';

const logos = [
    aws,
    clevertap,
    americana,
    tableau,
    azure,
    aws,
    americana,
    azure,
]

const Partners = () => {
    return (
        <Block xpad='15%'>
            <section className="flex w-full overflow-hidden justify-between lg:flex-row flex-col">

                {/* Left side block, contains Title */}
                <div className='flex items-center' style={{flexBasis: '50%'}}>
                    {/* Title and Subheading */}
                    <div className="">
                        <h2 className="section-title">
                            Backed by
                            <br />
                            <span className="highlight">Industry Leaders</span>
                        </h2>
                        <p className="section-description">
                            Collaborating with industry leaders to drive innovation and success.
                            It's the growth that compounds. Intelligent agents continuously optimize engagement, retention, and expansion—turning every customer into a long-term value driver.
                        </p>
                    </div>
                </div>

               {/* Right side block with self-contained background and glass card */}
                <div className="relative flex justify-center" style={{ flexBasis: '45%' }}>

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
                    </div>

                    {/* Glass Card */}
                    <div
                        className="relative z-10 w-full lg:mx-10 mx-2 my-7 flex flex-col items-center justify-center"
                        style={{
                            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.1) 105%)',
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                            borderRadius: '10px',
                        }}
                    >
                        {/* Logo Grid - 2 columns */}
                        <div className="w-full grid grid-cols-2 lg:px-20 px-3 py-22 gap-y-16 place-items-center">
                            {logos.map((logo, i) => (
                                <img
                                key={i}
                                src={logo}
                                alt={`Logo ${i}`}
                                className="h-9 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Block>
    );
};


export default Partners;
