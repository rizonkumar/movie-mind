const NotFoundTrailer = () => {
  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center text-zinc-100 p-6">
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 mb-4 shadow-inner">
        <i className="ri-film-line text-3xl"></i>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center text-zinc-200">
        No Trailer Available
      </h2>
      <p className="text-xs sm:text-sm text-zinc-400 text-center max-w-sm leading-relaxed">
        We couldn't locate a trailer video for this content at the moment.
      </p>
    </div>
  );
};

export default NotFoundTrailer;
