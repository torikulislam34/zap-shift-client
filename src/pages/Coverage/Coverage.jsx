import React from 'react';
import CoverageMap from './CoverageMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {

    const sersviceCenters = useLoaderData();
    console.log(sersviceCenters)
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
                We are available in 64 districts!
            </h1>

            {/* Search box (placeholder for now) */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search district..."
                    className="input input-bordered w-full max-w-md"
                />
            </div>

            {/* Map */}
            <CoverageMap sersviceCenters={sersviceCenters}/>
        </div>
    );
};

export default Coverage;