import styled from "styled-components";
import { colors } from "../../styles/colors";

export const GlobalBackground = styled.div`
  background-color: ${colors.black};
  position: fixed;
  inset: 0;
  z-index: -1;
`;

export const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  margin-left: 220px;
  flex: 1;
  padding: 32px 24px;
  min-height: 100vh;
  max-width: 700px;
  border-left: 1px solid ${colors.anotherHim};
  border-right: 1px solid ${colors.anotherHim};
`;

export const PageTitle = styled.h1`
  margin: 0 0 24px;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.white};
  line-height: 1.4;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 15px;
  font-weight: 700;
  color: ${colors.white};
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.white};
  border-radius: 9999px;
  padding: 10px 16px;
  gap: 8px;
  margin-bottom: 32px;
`;

export const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${colors.white};
  font-size: 16px;

  &::placeholder {
    color: ${colors.mockColor};
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${colors.white};
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const FeedbackMsg = styled.p`
  color: ${colors.gray};
  font-size: 15px;
  text-align: center;
  margin-top: 48px;
`;
