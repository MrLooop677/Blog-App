import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers, searchPosts } from "../../store/slices/post-slice";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        dispatch(searchPosts(searchTerm.trim()));
      }
    }, 800);

    return () => clearTimeout(timer); // Clean up the timer
  }, [searchTerm, dispatch]); // Re-run effect when searchTerm or dispatch changes

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search By Title..."
        className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
