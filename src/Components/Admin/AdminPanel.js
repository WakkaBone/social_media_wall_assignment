import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminPanelOnePost from "./AdminPanelOnePost";
import firebase from "../../firebase/config";
import { deletePostAction } from "../../redux/actions/postsActions";
import { AdminPanelContainer } from "../../Styled-Components/AdminPanelStyles";
import { HoverPointer } from "../../Styled-Components";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.allPosts);
  const postsCollection = firebase.firestore().collection("posts");

  const handleDeletePost = async (id) => {
    await postsCollection.doc(id).delete();
    dispatch(deletePostAction(id));
  };

  return (
    <AdminPanelContainer>
      <h1>Admin panel</h1>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Post title</th>
            <th>Created at</th>
            <th>Delete</th>
          </tr>
          {allPosts.map((post, index) => (
            <AdminPanelOnePost
              key={index}
              {...post}
              handleDeletePost={handleDeletePost}
            />
          ))}
        </tbody>
      </table>
    </AdminPanelContainer>
  );
};

export default AdminPanel;
