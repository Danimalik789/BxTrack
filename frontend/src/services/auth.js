import api from "./api";

export const registerUser = async (payload) => {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (payload) => {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data;
  } catch (error) {
    throw error;
  }
};
