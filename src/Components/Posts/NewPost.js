import React from "react";
import { useFormik } from "formik";
import { ButtonBlue } from "../../Styled-Components";
import { NewPostFormContainer } from "../../Styled-Components/PostsStyles";

const NewPost = ({ handleAddPost = (f) => f }) => {
  const initialValues = { heading: "", description: "" };
  const validate = ({ heading, description }) => {
    const errors = {};
    if (!heading) errors.heading = `You must specify post's heading`;
    if (!description)
      errors.description = `You must specify post's description`;
    return errors;
  };
  const onSubmit = (values, { resetForm }) => {
    handleAddPost(values);
    resetForm();
  };
  const postCreationForm = useFormik({ initialValues, validate, onSubmit });
  return (
    <NewPostFormContainer
      onSubmit={(e) => {
        e.preventDefault();
        postCreationForm.handleSubmit();
      }}
    >
      <input
        type="text"
        placeholder="Heading"
        {...postCreationForm.getFieldProps("heading")}
      />
      <textarea
        placeholder="Description"
        {...postCreationForm.getFieldProps("description")}
      />
      <ButtonBlue type="submit">Add</ButtonBlue>
    </NewPostFormContainer>
  );
};

export default NewPost;
