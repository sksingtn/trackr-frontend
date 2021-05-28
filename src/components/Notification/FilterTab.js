import React from "react";
import styled, { css } from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 0.5em;

  & .heading {
    font-size: 1.2em;
  }
`;

const Filter = styled.span`
  text-transform: uppercase;
  padding: 0.5em 0.75em;
  color: var(--primary);
  border-radius: 5px;
  box-shadow: 0px 0px 1px 1px var(--primary);
  margin-right: 0.5em;
  text-align: center;
  font-family: sans-serif;
  font-size: 0.9em;
  cursor: pointer;

  ${(props) =>
    props.checked &&
    css`
      background: var(--primary);
      color: white;
    `}
`;

const ClearFilter = styled(CloseIcon)`
  cursor: pointer;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

function FilterTab() {
  const [selected, setSelected] = React.useState(1);

  return (
    <TabContainer>
      <span className="heading">FILTER&nbsp;:&nbsp;</span>
      <Filter checked={selected === 1} onClick={() => setSelected(1)}>
        Sent
      </Filter>
      <Filter checked={selected === 2} onClick={() => setSelected(2)}>
        Received
      </Filter>
      <ClearFilter onClick={() => setSelected(0)} show={selected !== 0} />
    </TabContainer>
  );
}

export default FilterTab;
