import React from "react";
import { FiFacebook } from "react-icons/fi";
import { HeaderContainer } from "../../Styled-Components/HeaderStyles";
import { useSelector } from "react-redux";
import Auth from "./Auth/Main";
import AdminBar from "../Admin/EnterAdminPanel";

const Header = ({ adminBarOpen = false, setAdminBarOpen = (f) => f }) => {
  const activeUser = useSelector((state) => state.auth.activeUser);
  return (
    <HeaderContainer>
      <h1 style={{ width: "100%" }}>
        <FiFacebook />
        {""}acebook
      </h1>
      {activeUser && (
        <h2 style={{ width: "100%" }}>
          Welcome, <b>{activeUser.username}</b>
        </h2>
      )}
      <Auth setAdminBarOpen={setAdminBarOpen} />{" "}
      {activeUser && activeUser.roles.includes("admin") && (
        <AdminBar
          adminBarOpen={adminBarOpen}
          setAdminBarOpen={setAdminBarOpen}
        />
      )}
    </HeaderContainer>
  );
};

export default Header;
