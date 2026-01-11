import styled from "styled-components";

export const H1 = styled.h1<{ $whiteFont?: boolean; $oldFont?: boolean }>`
  font-family: ${({ theme, $oldFont }) => ($oldFont ? theme.typography.fonts.old : theme.typography.fonts.main)};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  font-style: normal;
  color: ${({ theme, $whiteFont }) => ($whiteFont ? theme.palette.secondary : theme.palette.primary)};
`;

export const P = styled.p<{ $whiteFont?: boolean; $oldFont?: boolean }>`
  font-family: ${({ theme, $oldFont }) => ($oldFont ? theme.typography.fonts.old : theme.typography.fonts.main)};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
  font-size: ${({ theme }) => theme.typography.fontSizes.body};
  font-style: normal;
  color: ${({ theme, $whiteFont }) => ($whiteFont ? theme.palette.secondary : theme.palette.primary)};
`;

export const CircleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background: rgb(0, 0, 0);
  }
`;
