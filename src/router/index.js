import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AddPost, EditPost, ErrorPage, HomePage, PostDetails } from "../pages";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "addpost",
        element: <AddPost />,
      },
      {
        path: "editPost/:id",
        element: <EditPost />,
      },
      {
        path: "detailsPost/:id",
        element: <PostDetails />,
      },
    ],
  },
]);

export default route;
