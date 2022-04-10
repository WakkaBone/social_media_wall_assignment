export const GET_ALL_USERS = "GET_ALL_USERS";
export const getAllUsersAction = (users) => ({
  type: GET_ALL_USERS,
  payload: { allUsers: users },
});
export const ADD_USER = "ADD_USER";
export const addUserAction = (user) => ({ type: ADD_USER, payload: user });
