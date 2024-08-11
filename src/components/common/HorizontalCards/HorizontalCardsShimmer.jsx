const HorizontalCardsShimmer = () => {
  return (
    <div className="w-full h-auto p-4 sm:p-[44px] relative">
      <div className="mb-5">
        <div className="w-48 h-8 bg-zinc-700 rounded animate-pulse"></div>
      </div>
      <div className="flex overflow-x-hidden">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-[250px] h-[40vh] flex-shrink-0 mx-2 bg-zinc-700 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCardsShimmer;
