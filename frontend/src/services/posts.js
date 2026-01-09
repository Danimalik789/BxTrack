import api from "./api";

export const getPosts = async (params = {}) => {
  const { data } = await api.get("/posts", { params });
  return data;
};

export const getPostById = async (id) => {
  const { data } = await api.get(`/posts/${id}`);
  return data;
};

export const createPost = async (payload) => {
  const { data } = await api.post("/posts", payload);
  return data;
};

export const updatePost = async (id, payload) => {
  const { data } = await api.put(`/posts/${id}`, payload);
  return data;
};

export const deletePost = async (id) => {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
};
