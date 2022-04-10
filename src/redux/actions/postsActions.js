export const GET_MY_POSTS = "GET_MY_POSTS";
export const getMyPostsAction = (myPosts) => ({
  type: GET_MY_POSTS,
  payload: { myPosts },
});
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const getAllPostsAction = (allPosts) => ({
  type: GET_ALL_POSTS,
  payload: { allPosts },
});
export const ADD_POST = "ADD_POST";
export const addPostAction = (post) => ({ type: ADD_POST, payload: { post } });
export const DELETE_POST = "DELETE_POST";
export const deletePostAction = (id) => ({ type: DELETE_POST, payload: id });
export const EDIT_POST = "EDIT_POST";
export const editPostAction = (id, newContent) => ({
  type: EDIT_POST,
  payload: { id, newContent },
});
export const TOGGLE_LIKE_POST = "TOGGLE_LIKE_POST";
export const toggleLikePostAction = (id, email) => ({
  type: TOGGLE_LIKE_POST,
  payload: { id, email },
});
export const TOGGLE_FILTER = "TOGGLE_FILTER";
export const toggleFilterAction = (status) => ({
  type: TOGGLE_FILTER,
  payload: { status },
});
export const FILTER_BY_USER = "FILTER_BY_USER";
export const filterByUserAction = (email) => ({
  type: FILTER_BY_USER,
  payload: { email },
});
