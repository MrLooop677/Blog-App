import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUsers } from "../store/slices/post-slice";
import { Link } from "react-router-dom";
import { Card } from "../components/card/card.component";
import Pagination from "../components/pagination/pagination.component";
import { Loader } from "../components/loader/loader";
import RequestError from "../components/request-error/request-error.component";
import SearchInput from "../components/search/search.component";
import { RiRefreshLine } from "react-icons/ri";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { record, users, error, loader, paginate } = useSelector(
    (state) => state.postSlice
  );
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);
  const getUsersAndPosts = useCallback(() => {
    dispatch(getPosts(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    getUsersAndPosts();
  }, [getUsersAndPosts]);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const renderContent = () => {
    if (loader) return <Loader />;
    if (error) return <RequestError error={error} />;
    return <Card items={record} users={users} />;
  };

  return (
    <>
      <div className="btn text-center mt-20">
        <Link
          to="/addpost"
          className="w-44 justify-center inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Post
        </Link>
      </div>
      <div className="max-w-md w-full m-auto mt-10">
        <SearchInput />
      </div>

      <div className="absolute top-1/4 right-40 group">
        <RiRefreshLine
          className="cursor-pointer size-8 text-blue-500"
          title="Refresh page"
          onClick={getUsersAndPosts}
        />
      </div>
      {renderContent()}
      {paginate?.pages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={paginate.pages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
