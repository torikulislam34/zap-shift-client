import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const Profastlogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img className='mb-2' src={logo} alt="" />
                <p className='text-2xl -ms-2 font-extrabold'>DeliverFast</p>
            </div>
        </Link>
    );
};

export default Profastlogo;