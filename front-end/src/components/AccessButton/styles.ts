import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/colors";

export const AccessBTN = styled(Link)`
  background-color: ${colors.black};
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
`;
