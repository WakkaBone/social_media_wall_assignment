import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
} from "./../actions/authActions";

const authInitialState = { isLoggedIn: false, activeUser: null };
export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLoggedIn: true, activeUser: action.payload.user };
    case REGISTER_USER:
      return { ...state, isLoggedIn: true, activeUser: action.payload.user };
    case LOGOUT_USER:
      return { ...state, isLoggedIn: false, activeUser: null };
    default:
      return state;
  }
};
