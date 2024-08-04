import React from "react";

const MovieDetailError = ({ message, onRetry }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <i className="ri-error-warning-fill text-6xl text-red-500 mb-4"></i>
      <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-400 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Retry
      </button>
    </div>
  );
};

export default MovieDetailError;
