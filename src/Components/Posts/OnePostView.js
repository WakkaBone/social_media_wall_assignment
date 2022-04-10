import React from "react";
import {
  OnePostContainer,
  OnePostUsername,
  PostHeading,
  PostDescription,
  PostFooter,
  OnePostFooterActions,
} from "../../Styled-Components/PostsStyles";
import { HoverPointer } from "../../Styled-Components";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const OnePostView = ({
  id = "",
  activeUser = {},
  authorUsername = "",
  heading = "",
  description = "",
  createdAt = {},
  likedUsers = (f) => f,
  isFavorited = false,
  checkAuthorship = (f) => f,
  handleLikePost = (f) => f,
}) => {
  return (
    <OnePostContainer>
      <OnePostUsername>{authorUsername}</OnePostUsername>
      <PostHeading>{heading}</PostHeading>
      <PostDescription>{description}</PostDescription>
      <div>
        <sub>
          Created at: {new Date(createdAt.seconds * 1000).toUTCString()}
        </sub>
      </div>
      <PostFooter>
        {checkAuthorship()}{" "}
        {isFavorited ? (
          <OnePostFooterActions>
            <HoverPointer
              title={`Liked by: ${likedUsers() ? likedUsers() : "no one"}`}
              onClick={() => handleLikePost(id, activeUser.email)}
            >
              <AiFillLike />
              <span>Liked</span>
            </HoverPointer>
          </OnePostFooterActions>
        ) : (
          <OnePostFooterActions>
            <HoverPointer
              title={`Liked by: ${likedUsers() ? likedUsers() : "no one"}`}
              onClick={() => handleLikePost(id, activeUser.email)}
            >
              <AiOutlineLike />
              <span>Like</span>
            </HoverPointer>
          </OnePostFooterActions>
        )}
      </PostFooter>
    </OnePostContainer>
  );
};

export default OnePostView;
