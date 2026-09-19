import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const ProfilePostsContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ProfilePostsTitle = styled.h2`
  margin: 0;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  color: ${colors.white};
  border-bottom: 1px solid ${colors.anotherHim};
`;
