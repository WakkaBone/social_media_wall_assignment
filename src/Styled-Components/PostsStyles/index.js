import styled from "styled-components";

export const PostsContainer = styled.div`
  flex: 2;
`;

export const NewPostFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1%;
`;

export const OnePostContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding: 1%;
  margin-top: 1%;
`;

export const OnePostUsername = styled.h2`
  color: #6b80b0;
`;
export const PostHeading = styled.h3`
  padding: 0.5%;
`;
export const PostDescription = styled.p`
  padding: 0.5%;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5%;
`;

export const OnePostFooterActions = styled.div`
  background-color: #1a73e8;
  width: 33%;
  color: white;
  padding: 0.5%;
  text-align: center;
  :hover {
    background-color: #0a50ab;
  }
`;
