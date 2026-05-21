import api from "./api";


export const loginUser = async (
  email,
  password
) => {
  return await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );
};


export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get current user
export const getCurrentUser = () => {
  return JSON.parse(
    localStorage.getItem("user")
  );
};