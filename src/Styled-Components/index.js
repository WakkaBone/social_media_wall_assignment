import styled, { keyframes } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonWhite = styled.button`
  background-color: white;
  border: 1px solid white;
  color: #1a73e8;
  font-weight: 600;
  padding: 1%;
  :hover {
    cursor: pointer;
    background-color: #f5ebeb;
  }
`;

export const ButtonBlue = styled(ButtonWhite)`
  padding: 0.5%;
  background-color: #1a73e8;
  color: white;
  :hover {
    background-color: #0a50ab;
    border: 1px solid black;
  }
`;

export const Modal = styled.div`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: visibility 0.5s ease-in, opacity 0.5s ease-in;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  max-width: 50%;
`;

export const ContentContainer = styled.main`
  display: flex;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

export const CustomInput = styled.input`
  display: block;
  width: 100%;
`;

export const HoverPointer = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export const HoverPointerTableRow = styled.tr`
  :hover {
    cursor: pointer;
    background-color: #1a73e8;
    color: white;
  }
`;

const spinning = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px dashed blue;
  animation: ${spinning} 2s linear infinite;
`;

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
