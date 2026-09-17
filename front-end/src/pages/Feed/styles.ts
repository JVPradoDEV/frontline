import styled from "styled-components";
import { colors } from "../../styles/colors";

export const FeedGlobalStyle = styled.div`
  background-color: ${colors.black};
  position: fixed;
  inset: 0;
  z-index: -1;
`;

export const FeedLayout = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const MainContent = styled.main`
  margin-left: 220px;
  flex: 1;
  min-height: 100vh;
  max-width: 600px;
  border-left: 1px solid ${colors.anotherHim};
  border-right: 1px solid ${colors.anotherHim};
`;
