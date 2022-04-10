import { GET_ALL_USERS, ADD_USER } from "./../actions/usersActions";

const usersInitialState = { allUsers: [] };
export const usersReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload.allUsers };
    case ADD_USER:
      return { ...state, allUsers: [action.payload.user, ...state.allUsers] };
    default:
      return state;
  }
};
