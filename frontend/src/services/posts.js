import api from "./api";

export const getPosts = async (params = {}) => {
  try {
    const { data } = await api.get("/posts", { params });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (payload) => {
  try {
    const { data } = await api.post("/posts", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (id, payload) => {
  try {
    const { data } = await api.put(`/posts/${id}`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await api.delete(`/posts/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
