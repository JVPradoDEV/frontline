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
`;

export const MainContent = styled.main`
  margin-left: 220px;
  flex: 1;
  padding: 0 16px;
  min-height: 100vh;
`;
