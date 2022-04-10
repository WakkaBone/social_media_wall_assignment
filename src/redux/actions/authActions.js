export const REGISTER_USER = "REGISTER_USER";
export const registerUserAction = (user) => ({
  type: REGISTER_USER,
  payload: { user },
});
export const LOGIN_USER = "LOGIN_USER";
export const loginUserAction = (user) => ({
  type: LOGIN_USER,
  payload: { user },
});
export const LOGOUT_USER = "LOGOUT_USER";
export const logoutUserAction = () => ({ type: LOGOUT_USER });
