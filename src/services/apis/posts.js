import { axiosInstance } from "./baseapi";

export const getAllPosts = async (numPage) => {
  const posts = await axiosInstance.get(`/posts?_page=${numPage}`);
  return posts;
};
export const getAllUsers = async (numPage) => {
  const users = await axiosInstance.get(`/users`);
  return users;
};
export const getDetailPost = async (id) => {
  const posts = await axiosInstance.get(`/posts/${id}`);
  return posts;
};
export const createNewPost = async (post) => {
  const posts = await axiosInstance.post("/posts", post);
  return posts;
};
export const editPost = async (post) => {
  const editedPost = await axiosInstance.patch(`/posts/${post.id}`, post);
  return editedPost;
};
export const deletePost = async (id) => {
  const deletedPost = await axiosInstance.delete(`/posts/${id}`);
  return deletedPost;
};
export const searchPost = async (word) => {
  const post = await axiosInstance.get(`/posts?title=${word}`);
  return post;
};
