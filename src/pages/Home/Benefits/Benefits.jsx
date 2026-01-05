import React from 'react';
import BenefitCard from './BenefitCard';
import tracking from '../../../assets/benefits/tracking.png';
import call from '../../../assets/benefits/call.png';
import support from '../../../assets/benefits/support.png';


const benefits= [
    {
        id: 1,
        title: "Live Parcel Tracking",
        description:
        "Stay updated in real-time with our live parcel tracking feature. Monitor your shipment from pick-up to delivery with instant status updates.",
        image:  tracking,
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        description:
        "We handle your parcels with utmost care and ensure secure, damage-free delivery every time.",
        image: support,
    },
    {
        id: 3,
        title: "24/7 Call Center Support",
        description:
        "Our support team is available around the clock to assist you with any questions, updates, or delivery concerns.",
        image: call,
    },
];

const Benefits = () => {
    return (
        <div className='py-16 bg-base-200'>
            <div className='max-w-7xl mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-12'>Why Choose Us</h2>
                <div className='flex flex-col gap-6'>
                    {benefits.map((benefit) => (
                        <BenefitCard key = {benefit.id} {...benefit}/>
                    ))}
                </div>

            </div>           
        </div>
    );
};

export default Benefits;