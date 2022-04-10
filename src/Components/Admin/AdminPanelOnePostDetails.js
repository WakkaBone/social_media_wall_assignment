import React from "react";
import OnePostChart from "./OnePostChart";
import {
  AdminPanelPostDetails,
  AdminPanelPostDescription,
  AdminPanelPostDescriptionContainer,
} from "../../Styled-Components/AdminPanelStyles";

const AdminPanelOnePostDetails = ({
  open = false,
  description = "",
  likedBy = [],
}) => {
  return (
    <AdminPanelPostDetails visible={open}>
      <td colSpan="5">
        <AdminPanelPostDescriptionContainer open={open}>
          <AdminPanelPostDescription>{description}</AdminPanelPostDescription>
          <hr />
          <OnePostChart likedBy={likedBy} />
        </AdminPanelPostDescriptionContainer>
      </td>
    </AdminPanelPostDetails>
  );
};

export default AdminPanelOnePostDetails;
