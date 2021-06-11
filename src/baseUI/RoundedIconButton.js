import styled from "styled-components";

const RoundedIconButtonContainer = styled.button.attrs((props) => ({
  size: props.size || "2em",
}))`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  outline: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s ease;
  color: ${(props) => props.color || "var(--primary)"};

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }

  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const RoundedIconButton = ({ className, children, onClick, color, size }) => {
  return (
    <RoundedIconButtonContainer
      className={className}
      onClick={onClick}
      color={color}
      size={size}>
      {children}
    </RoundedIconButtonContainer>
  );
};

export default RoundedIconButton;
