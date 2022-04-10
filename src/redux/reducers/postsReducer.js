import {
  GET_ALL_POSTS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  TOGGLE_LIKE_POST,
  FILTER_BY_USER,
  GET_MY_POSTS,
  TOGGLE_FILTER,
} from "./../actions/postsActions";

const descendingSortCallback = (a, b) => {
  return b.createdAt.seconds - a.createdAt.seconds;
};
const postsInitialState = {
  myPosts: [],
  allPosts: [],
  filteredPosts: [],
  isFiltered: false,
};
export const postsReducer = (state = postsInitialState, action) => {
  switch (action.type) {
    case GET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload.myPosts,
      };
    case GET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload.allPosts.sort(descendingSortCallback),
      };
    case ADD_POST:
      return {
        ...state,
        allPosts: [action.payload.post, ...state.allPosts].sort(
          descendingSortCallback
        ),
        myPosts: [action.payload.post, ...state.myPosts].sort(
          descendingSortCallback
        ),
      };
    case DELETE_POST:
      const deletePostCallback = (post) => post.id === action.payload.id;
      return {
        ...state,
        myPosts: [...state.myPosts.filter(deletePostCallback)],
        allPosts: [...state.allPosts.filter(deletePostCallback)],
        filteredPosts: [...state.filteredPosts.filter(deletePostCallback)],
      };
    case EDIT_POST:
      const editPostCallback = (post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            heading: action.payload.newContent.heading,
            description: action.payload.newContent.description,
          };
        } else return post;
      };
      return {
        ...state,
        myPosts: [...state.myPosts.map(editPostCallback)],
        allPosts: [...state.allPosts.map(editPostCallback)],
        filteredPosts: [...state.filteredPosts.map(editPostCallback)],
      };
    case TOGGLE_LIKE_POST:
      const likePostCallback = (post) => {
        if (post.id === action.payload.id) {
          if (
            post.likedBy
              .map((like) => like.email)
              .includes(action.payload.email)
          ) {
            return {
              ...post,
              likedBy: post.likedBy.filter(
                (like) => like.email !== action.payload.email
              ),
            };
          } else
            return {
              ...post,
              likedBy: [
                { email: action.payload.email, timestamp: new Date() },
                ...post.likedBy,
              ],
            };
        } else return post;
      };
      return {
        ...state,
        myPosts: [...state.myPosts.map(likePostCallback)],
        allPosts: [...state.allPosts.map(likePostCallback)],
        filteredPosts: [...state.filteredPosts.map(likePostCallback)],
      };
    case TOGGLE_FILTER:
      return { ...state, isFiltered: action.payload.status };
    case FILTER_BY_USER:
      return {
        ...state,
        filteredPosts: state.allPosts.filter(
          (post) => post.authorEmail === action.payload.email
        ),
      };
    default:
      return state;
  }
};
