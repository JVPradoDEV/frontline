import styled from "styled-components";
import { colors } from "../../styles/colors";

export const GlobalBackground = styled.div`
  background-color: ${colors.black};
  position: fixed;
  inset: 0;
  z-index: -1;
`;

export const PostDetailLayout = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export const PostDetailMain = styled.main`
  margin-left: 220px;
  flex: 1;
  min-height: 100vh;
  max-width: 600px;
  border-left: 1px solid #2f2f2f;
  border-right: 1px solid #2f2f2f;
`;

export const PostDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px;
  border-bottom: 1px solid #2f2f2f;
  position: sticky;
  top: 0;
  background-color: ${colors.black};
  z-index: 10;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: none;
  border: none;
  color: ${colors.white};
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const PageTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${colors.white};
`;

export const CommentsSection = styled.section`
  display: flex;
  flex-direction: column;
`;
