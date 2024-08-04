// HeaderShimmer.jsx
import React from 'react';

const HeaderShimmer = () => {
    return (
        <div className="w-full h-[50vh] bg-gray-800 animate-pulse">
            <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 background-animate"></div>
        </div>
    );
};

export default HeaderShimmer;