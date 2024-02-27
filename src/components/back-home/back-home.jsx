import React from "react";
import { useNavigate } from "react-router-dom";

const BackHome = () => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-red-500 hover:bg-red-600 ms-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
      onClick={() => navigate("/")}
    >
      Back To Home
    </button>
  );
};

export default BackHome;
