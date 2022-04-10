import "./App.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import firebase from "./firebase/config";
import jwt from "jsonwebtoken";
import { useSelector, useDispatch } from "react-redux";
import Posts from "./Components/Posts/Main";
import AdminPanel from "./Components/Admin/AdminPanel";
import Users from "./Components/Users/Main";
import Header from "./Components/Header/Main";
import { loginUserAction, logoutUserAction } from "./redux/actions/authActions";
import { getAllPostsAction } from "./redux/actions/postsActions";
import { MainContainer, ContentContainer } from "./Styled-Components";
import { UsersContainer } from "./Styled-Components/UsersStyles";
import { PostsContainer } from "./Styled-Components/PostsStyles";

function App() {
  const [adminBarOpen, setAdminBarOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const postsCollection = firebase.firestore().collection("posts");
  const allPosts = useSelector((state) => state.posts.allPosts);

  const getAllPosts = async () => {
    let posts = [];
    const temp = await postsCollection.get();
    temp.forEach((post) =>
      posts.push(Object.assign(post.data(), { id: post.id }))
    );
    dispatch(getAllPostsAction(posts));
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("facebook_mini_token");
    if (token) {
      try {
        const user = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
        dispatch(loginUserAction(user));
      } catch (err) {
        console.error(err);
        dispatch(logoutUserAction());
      }
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [allPosts.length]);

  return (
    <MainContainer>
      <Header adminBarOpen={adminBarOpen} setAdminBarOpen={setAdminBarOpen} />
      <ContentContainer>
        {adminBarOpen ? (
          <AdminPanel />
        ) : (
          <>
            {isLoggedIn && (
              <UsersContainer>
                <Users />
              </UsersContainer>
            )}
            {isLoggedIn && (
              <PostsContainer>
                <Posts />
              </PostsContainer>
            )}
          </>
        )}
      </ContentContainer>
    </MainContainer>
  );
}

export default App;
