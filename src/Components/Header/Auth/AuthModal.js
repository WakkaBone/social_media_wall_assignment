import React from "react";
import { Modal, ModalContent } from "../../../Styled-Components";
import AuthForm from "./AuthForm";

const AuthModal = ({
  modalOpen = false,
  setModalOpen = (f) => f,
  handleLogin = (f) => f,
  handleRegistration = (f) => f,
  errorMessage = "",
  setErrorMessage = (f) => f,
  mode = "login",
}) => {
  return (
    <Modal
      visible={modalOpen}
      onClick={() => {
        setModalOpen(false);
      }}
    >
      <ModalContent visible={modalOpen} onClick={(e) => e.stopPropagation()}>
        <AuthForm
          mode={mode}
          submitFunction={mode === "login" ? handleLogin : handleRegistration}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
