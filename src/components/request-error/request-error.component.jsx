import React from "react";

function RequestError({ error }) {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">{error}</h2>
        <p className="text-gray-600">
          Sorry, the requested data could not be found.
        </p>
      </div>
    </div>
  );
}

export default RequestError;
