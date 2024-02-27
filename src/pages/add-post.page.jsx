import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../store/slices/post-slice";
import swal from "sweetalert";
import BackHome from "../components/back-home/back-home";

export default function MyForm() {
  const dispatch = useDispatch();
  const { error, loader, users } = useSelector((state) => state.postSlice);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = useCallback(
    (data) => {
      const userId = users[Object.keys(users).length]?.id;
      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();
      dispatch(addPosts({ ...data, userId, date }));
      if (error) {
        swal(`${error}!`, `Failed to add post `, "error");
      } else {
        swal("Done!", "Added Post Successfully!", "success");
        reset();
      }
    },
    [dispatch, error, users, reset]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto">
      <h1 className="text-3xl text-center my-10">Add Form</h1>
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
        <input
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
          {loader ? "Loading..." : "Add Post"}
        </button>
        <BackHome />
      </div>
    </form>
  );
}
