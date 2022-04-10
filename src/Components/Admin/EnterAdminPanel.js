import React from "react";
import { ButtonWhite } from "../../Styled-Components";
import { EnterAdminPanelButtonContainer } from "../../Styled-Components/AdminPanelStyles";

const EnterAdminPanel = ({ adminBarOpen, setAdminBarOpen }) => {
  return (
    <EnterAdminPanelButtonContainer>
      <ButtonWhite onClick={() => setAdminBarOpen(!adminBarOpen)}>
        {adminBarOpen ? "Exit admin panel" : "Enter admin panel"}
      </ButtonWhite>
    </EnterAdminPanelButtonContainer>
  );
};

export default EnterAdminPanel;
