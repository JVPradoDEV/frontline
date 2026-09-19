import styled from "styled-components";
import { SideContainer } from "../../styles/mainstyle";
import { colors } from "../../styles/colors";
import { AccessBTN } from "../../components/AccessButton/styles";

export const LoginContainer = styled(SideContainer)`
  background-color: ${colors.black};
  box-shadow: 2px 0px 2px ${colors.white};
  width: 35%;
  height: 100vh;
  font-family: "Roboto", "sans-serif";
`;

export const LoginDiv = styled.div`
  margin-top: 18px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const ErrorMsg = styled.p<{ $visible: boolean }>`
  margin-top: 0px;
  margin-bottom: 14px;
  text-align: center;
  min-height: 18px;
  font-size: 13px;
  font-weight: bold;
  color: ${colors.lightRed};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
`;

export const SubmitButton = styled.button`
  background-color: ${colors.black};
  border: solid 1px ${colors.white};
  color: ${colors.white};
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 32px;
  box-shadow: 0px 3px ${colors.gray};
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;

export const FieldsDiv = styled.div`
  color: ${colors.white};
  background-color: ${colors.black};
  border: solid 1px ${colors.white};
  border-radius: 24px;
  padding: 28px;
  font-weight: 500;

  .input {
    display: grid;
    padding-bottom: 22px;

    input {
      background-color: ${colors.white};
      border: none;
      border-radius: 12px;
      height: 35px;
    }
  }

  .btns {
    display: grid;
    width: 100%;
    row-gap: 12px;
    align-items: center;
    text-align: center;

    p {
      font-size: 24px;
      font-weight: bold;
    }

    ${AccessBTN} {
      width: 100%;
    }
  }
`;
