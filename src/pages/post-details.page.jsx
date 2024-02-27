import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../store/slices/post-slice";
import { Loader } from "../components/loader/loader";
import RequestError from "../components/request-error/request-error.component";
import BackHome from "../components/back-home/back-home";

function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleRecord, error, loader, users } = useSelector(
    (state) => state.postSlice
  );

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  return (
    <>
      <h1 className="text-3xl text-center mb-8 mt-10">Post Details</h1>

      <div className="flex flex-col items-center justify-center h-screen">
        {loader ? (
          <Loader />
        ) : error ? (
          <RequestError error={error} />
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-3/5">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              <span className="text-blue-800"> Title.</span>:{" "}
              {singleRecord?.title}
            </h2>
            <h3 className="font-bold mt-2 text-center">
              <span className="text-blue-800"> Author.</span>:{" "}
              {users[singleRecord?.userId]?.name}
            </h3>
            <h3 className="font-bold mt-2 text-center">
              <span className="text-blue-800"> Publication date.</span>:{" "}
              {singleRecord?.date}
            </h3>
            <p className="text-gray-600 mt-2 text-center">
              {singleRecord?.body}
            </p>
          </div>
        )}
        <BackHome />
      </div>
    </>
  );
}

export default PostDetails;
