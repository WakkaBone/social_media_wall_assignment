import React from "react";
import { useFormik } from "formik";
import { ButtonBlue, CustomInput } from "../../Styled-Components";
import { OnePostUsername } from "../../Styled-Components/PostsStyles";

const OnePostEdit = ({
  handleEditPost = (f) => f,
  setIsEdit = (f) => f,
  id = "",
  heading = "",
  description = "",
  authorUsername = "",
}) => {
  const initialValues = { heading, description };
  const validate = ({ heading, description }) => {
    const errors = {};
    if (!heading) errors.heading = `You must specify post's heading`;
    if (!description)
      errors.description = `You must specify post's description`;
    return errors;
  };
  const onSubmit = (values) => {
    handleEditPost(id, values);
    setIsEdit(false);
  };
  const postCreationForm = useFormik({ initialValues, validate, onSubmit });
  return (
    <form onSubmit={postCreationForm.handleSubmit}>
      <OnePostUsername>{authorUsername}</OnePostUsername>
      <CustomInput
        type="text"
        placeholder="Heading"
        {...postCreationForm.getFieldProps("heading")}
      />
      <div>
        <textarea
          style={{ width: "100%" }}
          placeholder="Description"
          {...postCreationForm.getFieldProps("description")}
        />
      </div>
      <ButtonBlue type="submit">Save</ButtonBlue>
    </form>
  );
};

export default OnePostEdit;
