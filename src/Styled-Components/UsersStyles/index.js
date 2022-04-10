import styled from "styled-components";

export const UsersContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1%;
`;

export const FourUsersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 2%;
`;

export const OneUserContainer = styled.div`
  width: 50%;
  border: 1px solid black;
  padding: 5%;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  :hover {
    font-size: 1.5em;
    background-color: #1a73e8;
    color: white;
  }
`;
