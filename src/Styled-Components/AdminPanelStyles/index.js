import styled from "styled-components";

export const EnterAdminPanelButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const AdminPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1%;
  width: 100%;
`;

export const AdminPanelPostDetails = styled.tr`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  width: 100%;
  background-color: whitesmoke;
  transition: visibility 1s ease-in-out, opacity 1s ease-in-out;
`;

export const AdminPanelPostDescriptionContainer = styled.div`
  padding: 0 0.5%;
  height: ${(props) => (props.open ? "auto" : 0)};
`;

export const AdminPanelPostDescription = styled.p`
  padding: 0.5%;
  text-indent: 20px;
`;

export const AdminPanelPostStatistics = styled.div`
  margin: 1%;
`;
