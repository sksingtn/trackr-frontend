import React from "react";
import styled from "styled-components";

const TagWrapper = styled.span`
  --tagcolor: ${(props) => props.color || "#28901f"};
  width: fit-content;
  font-size: 0.6em;
  font-weight: 200;
  color: var(--tagcolor);
  border: 1px solid var(--tagcolor);
  border-radius: 10px;
  padding: 0.2em 0.4em;
  text-transform: uppercase;
`;

function Tag({ className, color, text }) {
  return (
    <TagWrapper className={className} color={color}>
      {text}
    </TagWrapper>
  );
}

export default Tag;
