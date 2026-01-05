import Marquee from 'react-fast-marquee';

// import logos
import amazon from '../../../assets/brands/amazon.png'
import google from '../../../assets/brands/google.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import star from '../../../assets/brands/star.png'
import randstad from '../../../assets/brands/randstad.png'
import start_people from '../../../assets/brands/start_people.png'
const logos = [amazon, google, casio, moonstar, star, randstad, start_people];

const ClientLogosMarquee = () => {
    return (
        <section className="py-12 bg-gray-100">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-10 text-[#03373D]">
                We've helped thousands of sales teams 
                </h2>

                <Marquee speed={50} pauseOnHover={true} gradient={false}>
                    {logos.map((logo, idx) => (
                        <div  key={idx} className='mx-24 flex item-center'>                          
                            <img
                            src={logo}
                            alt={`Company Logo ${idx + 1}`}
                            className="mt-5 h-8 object-contain"
                        />
                        </div>
                       
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default ClientLogosMarquee;
