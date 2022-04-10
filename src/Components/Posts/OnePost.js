import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import OnePostEdit from "./OnePostEdit";
import {
  HoverPointer,
  LoadingSpinner,
  LoadingSpinnerContainer,
} from "../../Styled-Components";
import { OnePostFooterActions } from "../../Styled-Components/PostsStyles";
import OnePostView from "./OnePostView";

const OnePost = ({
  heading = "",
  description = "",
  authorEmail = "",
  authorUsername = "",
  likedBy = [],
  id = "",
  createdAt = {},
  handleDeletePost = (f) => f,
  handleEditPost = (f) => f,
  handleLikePost = (f) => f,
  postChangeLoading = false,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const activeUser = useSelector((state) => state.auth.activeUser);

  const checkFavorited = () => {
    if (likedBy.map((like) => like.email).includes(activeUser.email)) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  };

  useEffect(() => {
    checkFavorited();
  }, [likedBy.length]);

  const likedUsers = () =>
    likedBy
      .map(({ email }, index) =>
        index < likedBy.length - 1 ? `${email},` : `${email}.`
      )
      .join(" ");

  const checkAuthorship = () => {
    if (activeUser && activeUser.email === authorEmail) {
      return (
        <>
          <OnePostFooterActions>
            <HoverPointer onClick={() => handleDeletePost(id)}>
              <AiFillDelete /> Delete
            </HoverPointer>
          </OnePostFooterActions>
          <OnePostFooterActions>
            <HoverPointer onClick={() => setIsEdit(true)}>
              <AiFillEdit /> Edit
            </HoverPointer>
          </OnePostFooterActions>
        </>
      );
    }
  };

  if (postChangeLoading) {
    return (
      <LoadingSpinnerContainer>
        <LoadingSpinner />
      </LoadingSpinnerContainer>
    );
  }

  return (
    <>
      {isEdit ? (
        <OnePostEdit
          id={id}
          heading={heading}
          description={description}
          authorUsername={authorUsername}
          handleEditPost={handleEditPost}
          setIsEdit={setIsEdit}
        />
      ) : (
        <OnePostView
          id={id}
          activeUser={activeUser}
          authorUsername={authorUsername}
          heading={heading}
          description={description}
          createdAt={createdAt}
          isFavorited={isFavorited}
          checkAuthorship={checkAuthorship}
          handleLikePost={handleLikePost}
          likedUsers={likedUsers}
        />
      )}
      <hr />
    </>
  );
};

export default OnePost;
