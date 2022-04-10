import React, { useState } from "react";
import firebase from "../../../firebase/config";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserAction,
  loginUserAction,
  logoutUserAction,
} from "../../../redux/actions/authActions";
import { addUserAction } from "../../../redux/actions/usersActions";
import { ButtonWhite } from "../../../Styled-Components";
import { AuthBar } from "../../../Styled-Components/HeaderStyles";
import AuthModal from "./AuthModal";

const Main = ({ setAdminBarOpen = (f) => f }) => {
  const [mode, setMode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const usersCollection = firebase.firestore().collection("users");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleRegistration = async (user) => {
    try {
      const usersData = await (
        await usersCollection.get()
      ).docs.map((user) => user.data());
      const emailExists = usersData
        .map((user) => user.email.toLowerCase())
        .includes(user.email.toLowerCase());
      const usernameExists = usersData
        .map((user) => user.username)
        .includes(user.username);
      if (emailExists || usernameExists) {
        setErrorMessage("This user has already been registered");
        return;
      }
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      const newUser = {
        email: user.email.trim().toLowerCase(),
        username: user.username,
        password: hashedPassword,
        roles: ["user"],
      };
      await usersCollection.add(newUser);
      const token = jwt.sign(newUser, process.env.REACT_APP_JWT_SECRET, {
        expiresIn: "1h",
      });
      localStorage.setItem("facebook_mini_token", token);
      dispatch(addUserAction(newUser));
      dispatch(registerUserAction(newUser));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (user) => {
    let candidate;
    try {
      await usersCollection
        .where("email", "==", user.email.trim().toLowerCase())
        .get()
        .then((doc) => {
          doc.forEach((doc) => (candidate = doc.data()));
        });
      await usersCollection
        .where("username", "==", user.username)
        .get()
        .then((doc) => {
          doc.forEach((doc) => (candidate = doc.data()));
        });
      if (!candidate) {
        setErrorMessage("Such user is not registered");
        return;
      }
      const validPassword = await bcryptjs.compare(
        user.password,
        candidate.password
      );
      if (!validPassword) {
        setErrorMessage("Wrong password!");
        return;
      }
      const token = jwt.sign(candidate, process.env.REACT_APP_JWT_SECRET, {
        expiresIn: "1h",
      });
      localStorage.setItem("facebook_mini_token", token);
      dispatch(loginUserAction(candidate));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("facebook_mini_token");
    setAdminBarOpen(false);
    setModalOpen(false);
    setMode("");
    dispatch(logoutUserAction());
  };

  return (
    <AuthBar>
      {!isLoggedIn ? (
        <>
          <p style={{ width: "100%" }}>
            Looks like you're not logged in.{" "}
            <ButtonWhite
              onClick={() => {
                setModalOpen(true);
                setMode("login");
              }}
            >
              Sign in
            </ButtonWhite>{" "}
            or{" "}
            <ButtonWhite
              onClick={() => {
                setModalOpen(true);
                setMode("register");
              }}
            >
              Sign up
            </ButtonWhite>{" "}
            please.
          </p>
          {mode === "login" && (
            <AuthModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              handleLogin={handleLogin}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              mode={"login"}
            />
          )}
          {mode === "register" && (
            <AuthModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              handleRegistration={handleRegistration}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              mode={"register"}
            />
          )}
        </>
      ) : (
        <ButtonWhite onClick={handleLogout}>Logout</ButtonWhite>
      )}
    </AuthBar>
  );
};

export default Main;
