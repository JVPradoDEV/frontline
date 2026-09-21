import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";

interface AvatarProps {
  $foto?: string | null;
  $size?: number;
  $border?: boolean;
}

export const Avatar = styled.div<AvatarProps>`
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${colors.mockColor};
  background-size: cover;
  background-position: center;

  background-image: ${({ $foto }) => ($foto ? `url(${$foto})` : "none")};

  width: ${({ $size }) => $size ?? 42}px;
  height: ${({ $size }) => $size ?? 42}px;

  ${({ $border }) =>
    $border &&
    css`
      border: 3px solid ${colors.black};
    `}
`;
