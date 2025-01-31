import styled from "styled-components";

export const H1 = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.main};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  font-style: normal;
  color: ${({ theme }) => theme.palette.secondary};
`;

export const P = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.main};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
  font-size: ${({ theme }) => theme.typography.fontSizes.body};
  font-style: normal;
  color: ${({ theme }) => theme.palette.secondary};
`;
