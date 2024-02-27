import { FaRegTrashCan, FaPen } from "react-icons/fa6";
import Swal from "sweetalert";
import { useDispatch } from "react-redux";
import { deletePosts } from "../../store/slices/post-slice";
import { useNavigate } from "react-router-dom";

export function Card({ items, users }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (post) => {
    Swal({
      title: "Delete Item",
      text: `Are you sure you want to delete ${post?.title}?`,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((result) => {
      if (result) {
        dispatch(deletePosts(post?.id));
        Swal("Poof! Your item has been deleted!", {
          icon: "success",
        });
      } else {
        Swal("Your item is safe!");
      }
    });
  };
  const content = items?.map((post) => (
    <div
      key={post?.id}
      id={post?.id}
      className="group relative mb-20 shadow-lg rounded p-5 h-96"
    >
      <div className="icons flex justify-end">
        <button onClick={() => navigate(`/editPost/${post?.id}`)}>
          <FaPen className="me-4 text-lime-600" />
        </button>
        <button onClick={() => handleDelete(post)}>
          <FaRegTrashCan className="text-red-600" />
        </button>
      </div>
      <div className="mt-4">
        <div>
          <h1 className="font-bold">
            <span className="text-blue-800">Title</span>: {post?.title}
          </h1>
          <h3 className="font-bold mt-2">
            <span className="text-blue-800"> Author.</span>:{" "}
            {users[post?.userId]?.name}
          </h3>
          <h3 className="font-bold mt-2">
            <span className="text-blue-800"> Publication date.</span>:{" "}
            {post?.date}
          </h3>
          <p className="paragraph  text-sm text-gray-500 mt-3">
            {post?.body?.slice(0, 100)}...
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate(`/detailsPost/${post?.id}`)}
        className="text-sm font-medium text-white transition duration-150 hover:text-slate-300 bg-indigo-600 p-2 rounded shadow absolute bottom-5 w-50 left-50"
      >
        Read More
      </button>
    </div>
  ));
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items?.length ? (
            content
          ) : (
            <p className="text-3xl text-gray-800 text-center py-8 bg-gray-200 rounded-lg shadow-md">
              Not Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
