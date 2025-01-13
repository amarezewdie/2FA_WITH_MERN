import api from "./api";

export const registerUser = async ({ username, password }) => {
  return await api.post(
    "/auth/register",
    { username, password },
    { withCredentials: true }
  );
};
export const loginUser = async ({ username, password }) => {
  return await api.post(
    "/auth/login",
    { username, password },
    {
      withCredentials: true,
    }
  );
};
export const authStatus = async () => {
  return await api.get(
    "/auth/status",

    {
      withCredentials: true,
    }
  );
};
export const logOutUser = async () => {
  return await api.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
};
export const setUpTwoFa = async () => {
  return await api.post(
    "/auth/setup",
    {},
    {
      withCredentials: true,
    }
  );
};
export const verifyTwoFa = async (token) => {
  return await api.post(
    "/auth/verify",
    { token },
    {
      withCredentials: true,
    }
  );
};
export const resetTwoFa = async () => {
  return await api.post(
    "/auth/reset",
    {},
    {
      withCredentials: true,
    }
  );
};
