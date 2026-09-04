import styled, { createGlobalStyle } from "styled-components";
import { assets } from "./assets";

export const EstiloGlobal = createGlobalStyle`
    *{
        font-family: "Roboto", "sans-serif";
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    body{ 
        background-image: url(${assets.backgroundMain});
        background-size: cover;
        background-position: center;
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
