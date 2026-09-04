import styled from "styled-components";
import { SideContainer } from "../../styles/mainstyle";
import { colors } from "../../styles/colors";
import { AccessBTN } from "../../components/AccessButton/styles";

export const LoginContainer = styled(SideContainer)`
  background-color: ${colors.white};
  box-shadow: 2px 0px 2px ${colors.black};
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

export const FieldsDiv = styled.div`
  background-color: ${colors.white};
  border: solid 1px ${colors.gray};
  border-radius: 24px;
  padding: 28px;
  font-weight: 500;

  .input {
    display: grid;
    padding-bottom: 22px;

    input {
      background-color: ${colors.darkGray};
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
