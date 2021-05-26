import styled from "styled-components";

const DeleteButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: ${(props) => props.color || "red"};
  pointer-events: inherit;
  background: none;
  padding: none;
  outline: none;
  border: none;
  border-radius: 50%;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background: transparent;
  }
`;

const DeleteButton = ({ className, icon, color }) => {
  return (
    <DeleteButtonContainer className={className} color={color}>
      <i class={icon || "fas fa-trash"}></i>
    </DeleteButtonContainer>
  );
};

export default DeleteButton;
