import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/authReducer";
import { usersReducer } from "./reducers/usersReducer";
import { postsReducer } from "./reducers/postsReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  combineReducers({
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
  }),
  composeWithDevTools(applyMiddleware())
);
