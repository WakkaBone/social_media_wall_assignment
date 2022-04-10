import React from "react";
import { HoverPointer } from "../../Styled-Components/index";
import { OneUserContainer } from "../../Styled-Components/UsersStyles";

const OneUser = ({
  email = "",
  username = "",
  handleFilterByUser = (f) => f,
}) => {
  return (
    <OneUserContainer>
      {email ? (
        <HoverPointer>
          <p onClick={() => handleFilterByUser(email)}>{username}</p>
        </HoverPointer>
      ) : (
        "Loading"
      )}
    </OneUserContainer>
  );
};

export default OneUser;
