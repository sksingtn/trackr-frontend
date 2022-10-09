import styled from "styled-components";
import BG from "../../assets/patterns/Waiau.svg";

export const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: url(${BG});
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AppContainer = styled.div`
  width: 105em;
  height: 95%;
  min-height: 850px;

  background: white;

  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.73);

  display: grid;
  grid-template-columns: 256px 1fr;
`;

export const SidebarContainer = styled.div`
  grid-column: 1/2;
`;
