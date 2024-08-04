export const ErrorDisplay = ({ message }) => (
  <div className="w-full h-[40vh] flex flex-col justify-center items-center bg-gray-900">
    <i className="ri-error-warning-fill text-6xl text-red-500 mb-4"></i>
    <h2 className="text-2xl font-bold text-white mb-2">
      Oops! Something went wrong
    </h2>
    <p className="text-gray-400">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Retry
    </button>
  </div>
);
