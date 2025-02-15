import styled from "styled-components";

export const H1 = styled.h1<{ $whiteFont?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fonts.main};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  font-style: normal;
  color: ${({ theme, $whiteFont }) => ($whiteFont ? theme.palette.secondary : theme.palette.primary)};
`;

export const P = styled.p<{ $whiteFont?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fonts.main};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
  font-size: ${({ theme }) => theme.typography.fontSizes.body};
  font-style: normal;
  color: ${({ theme, $whiteFont }) => ($whiteFont ? theme.palette.secondary : theme.palette.primary)};
`;
