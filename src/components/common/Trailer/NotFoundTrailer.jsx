const NotFoundTrailer = () => {
    return (
        <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-white p-4">
            <i className="ri-film-line text-6xl sm:text-7xl md:text-8xl mb-4 text-gray-600"></i>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center">No Trailer Available</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 text-center max-w-md">
                We're sorry, but there's no trailer available for this content at the moment.
            </p>
        </div>
    );
};

export default NotFoundTrailer;