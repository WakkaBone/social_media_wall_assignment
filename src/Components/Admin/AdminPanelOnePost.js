import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { HoverPointerTableRow } from "../../Styled-Components";
import {
  AdminPanelPostDescription,
  AdminPanelPostDetails,
} from "../../Styled-Components/AdminPanelStyles";
import AdminPanelOnePostDetails from "./AdminPanelOnePostDetails";
import OnePostChart from "./OnePostChart";

const AdminPanelOnePost = ({
  id = "",
  authorUsername = "",
  authorEmail = "",
  heading = "",
  description = "",
  createdAt = {},
  likedBy = [],
  handleDeletePost = (f) => f,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HoverPointerTableRow onClick={() => setOpen(!open)}>
        <td>{authorUsername}</td>
        <td>{authorEmail}</td>
        <td>{heading}</td>
        <td>{new Date(createdAt.seconds * 1000).toUTCString()}</td>
        <td>
          <AiFillDelete
            title="Delete post"
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePost(id);
            }}
          />
        </td>
      </HoverPointerTableRow>
      <AdminPanelOnePostDetails
        open={open}
        description={description}
        likedBy={likedBy}
      />
    </>
  );
};

export default AdminPanelOnePost;
