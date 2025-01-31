import styled from "styled-components";

export const H1 = styled.h1`
  font-family: ${(props) => props.theme.typography.fonts.main};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  font-size: ${(props) => props.theme.typography.fontSizes.heading};
  font-style: normal;
`;

export const P = styled.p`
  font-family: ${(props) => props.theme.typography.fonts.main};
  font-weight: ${(props) => props.theme.typography.fontWeights.normal};
  font-size: ${(props) => props.theme.typography.fontSizes.body};
  font-style: normal;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;
