import React from "react";

export const ErrorDisplay = ({ message, onRetry }) => {
  const handleRetry = onRetry || (() => window.location.reload());

  return (
    <div className="w-full min-h-[40vh] flex justify-center items-center p-6 bg-transparent">
      <div className="glass-panel max-w-md w-full rounded-3xl p-8 text-center shadow-2xl flex flex-col items-center border border-red-500/10">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-4xl mb-6 shadow-lg shadow-red-500/5">
          <i className="ri-error-warning-line"></i>
        </div>
        <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
          Oops! Connection Error
        </h2>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          {message || "We encountered a network error while fetching data. Please try again."}
        </p>
        <button
          onClick={handleRetry}
          className="w-full py-3 px-6 text-sm font-semibold text-white rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-violet-600/30 duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <i className="ri-refresh-line"></i>
          Try Again
        </button>
      </div>
    </div>
  );
};

