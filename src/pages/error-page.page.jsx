import React from "react";
import BackHome from "../components/back-home/back-home";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
        alt=""
        className="w-1/2 md:w-1/3 lg:w-1/2 mx-auto mb-8"
      />
      <BackHome />
    </div>
  );
}

export default ErrorPage;
