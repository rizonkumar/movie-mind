import React from "react";
import { ErrorDisplay } from "../common/ErrorDisplay/ErrorDisplay";

const MovieDetailError = ({ message, onRetry }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0e0e11] text-white">
      <ErrorDisplay message={message} onRetry={onRetry} />
    </div>
  );
};

export default MovieDetailError;

