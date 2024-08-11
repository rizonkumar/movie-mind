import ReactPlayer from "react-player";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import NotFoundTrailer from "./NotFoundTrailer.jsx";

const Trailer = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytVideo = useSelector((state) => state[category].info.videos);

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
                <button
                    onClick={handleClose}
                    className="absolute -top-12 right-0 text-white text-3xl hover:text-[#6556CD] transition-colors duration-300"
                    aria-label="Close trailer"
                >
                    <i className="ri-close-line"></i>
                </button>
                <div className="aspect-w-16 aspect-h-9">
                    {ytVideo && ytVideo.key ? (

                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
                            controls
                            width="100%"
                            height="100%"
                            style={{position: "absolute", top: 0, left: 0}}
                        />) : (
                        <NotFoundTrailer/>

                    )}
                </div>
            </div>
        </div>
    );
};

export default Trailer;
