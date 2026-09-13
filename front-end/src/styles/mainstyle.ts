import styled, { createGlobalStyle } from "styled-components";
import { assets } from "./assets";
import { colors } from "./colors";

export const EstiloGlobal = createGlobalStyle`
    *{
        font-family: "Roboto", "sans-serif";
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    body{ 
        background-image: url(${assets.backgroundMainAlt});
        background-size: contain;
        background-position: right;
        background-repeat: no-repeat;
        background-color: ${colors.black};
    }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
