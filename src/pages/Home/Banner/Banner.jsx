import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannaeImg1 from '../../../assets/banner/banner1.png';
import bannaeImg2 from '../../../assets/banner/banner2.png';
import bannaeImg3 from '../../../assets/banner/banner3.png';
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <Carousel autoPlay= {true} infiniteLoop={true} showThumbs={false}>
            <div>
                <img src={bannaeImg1} />
                {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
                <img src={bannaeImg2} />
                {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
                <img src={bannaeImg3} />
                {/* <p className="legend">Legend 3</p> */}
            </div>
        </Carousel>
    );
};

export default Banner;