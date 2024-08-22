import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: ${props => props.theme.fonts.main};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.heading};
  font-style: normal;
`;

export const P = styled.p`
  font-family: ${props => props.theme.fonts.main};
  font-weight: ${props => props.theme.fontWeights.normal};
  font-size: ${props => props.theme.fontSizes.body};
  font-style: normal;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;