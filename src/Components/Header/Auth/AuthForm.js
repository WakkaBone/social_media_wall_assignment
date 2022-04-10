import React from "react";
import { useFormik } from "formik";
import {
  ErrorMessage,
  CustomInput,
  ButtonBlue,
} from "../../../Styled-Components/index";
import { AuthFormContainer } from "../../../Styled-Components/HeaderStyles";

const AuthForm = ({
  mode = "register",
  submitFunction = (f) => f,
  errorMessage = "",
  setErrorMessage = (f) => f,
}) => {
  const initialValues = { username: "", email: "", password: "" };
  const validate = ({ username, email, password }) => {
    const errors = {};
    if (!password) errors.password = "Please enter the password";
    if (mode === "register") {
      if (!username) errors.username = "Please enter the username";
      if (!email) errors.email = "Please enter the email";
    }
    if (mode === "login") {
      if (!username && !email) errors.email = "Please enter username or email";
    }
    return errors;
  };
  const onSubmit = (values) => {
    setErrorMessage("");
    submitFunction(values);
  };

  const form = useFormik({ initialValues, validate, onSubmit });
  return (
    <AuthFormContainer>
      <h1>{mode === "login" ? "Login" : "Register"}</h1>
      <form onSubmit={form.handleSubmit}>
        <CustomInput
          placeholder="username"
          type="text"
          {...form.getFieldProps("username")}
        />{" "}
        {form.touched.username && form.errors.username ? (
          <ErrorMessage>{form.errors.username}</ErrorMessage>
        ) : null}
        <CustomInput
          placeholder="email"
          type="email"
          {...form.getFieldProps("email")}
        />{" "}
        {form.touched.email && form.errors.email ? (
          <ErrorMessage>{form.errors.email}</ErrorMessage>
        ) : null}
        <CustomInput
          placeholder="password"
          type="password"
          {...form.getFieldProps("password")}
        />{" "}
        {form.touched.password && form.errors.password ? (
          <ErrorMessage>{form.errors.password}</ErrorMessage>
        ) : null}
        <ButtonBlue type="submit">
          {mode === "register" ? "Register" : "Login"}
        </ButtonBlue>
      </form>
      <ErrorMessage>{errorMessage ? errorMessage : null}</ErrorMessage>
    </AuthFormContainer>
  );
};

export default AuthForm;
