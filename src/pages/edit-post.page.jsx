import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editPosts, getSinglePost } from "../store/slices/post-slice";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import BackHome from "../components/back-home/back-home";

export default function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleRecord, error, loader } = useSelector((state) => {
    return state.postSlice;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    data.id = id;
    dispatch(editPosts(data));
    error
      ? swal(`${error}!`, `Failed to edit post `, "error")
      : swal("Done!", "Edit Post Successfuly!", "success");
  };

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleRecord) {
      setValue("title", singleRecord.title);
      setValue("body", singleRecord.body);
    }
  }, [singleRecord, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto">
      <h1 className="text-3xl text-center my-10">Edit Post</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: true, minLength: 3 })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && errors.title.type === "required" && (
          <p className="text-red-500 text-xs italic">Title is required</p>
        )}
        {errors.title && errors.title.type === "minLength" && (
          <p className="text-red-500 text-xs italic">
            Title must be at least 3 characters
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="body"
        >
          body:
        </label>
        <textarea
          rows="5"
          cols="10"
          type="text"
          id="body"
          {...register("body", { required: true, minLength: 3 })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.body ? "border-red-500" : ""
          }`}
        />
        {errors.body && errors.body.type === "required" && (
          <p className="text-red-500 text-xs italic">body is required</p>
        )}
        {errors.body && errors.body.type === "minLength" && (
          <p className="text-red-500 text-xs italic">
            body must be at least 3 characters
          </p>
        )}
      </div>
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {loader ? "Loading..." : "Edit"}
        </button>
        <BackHome />
      </div>
    </form>
  );
}
