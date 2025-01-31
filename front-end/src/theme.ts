import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  borderRadius: 2,
  palette: {
    common: {
      black: "black",
      white: "white"
    },
    primary: "black",
    secondary: "white"
  },
  typography: {
    fontSizes: {
      body: "16px",
      heading: "36px"
    },
    fonts: {
      main: "Open Sans, sans-serif"
    },
    fontWeights: {
      normal: 400,
      bold: 600
    }
  }
};

/*
light       #B3C6D5
semi-light  #7391AA
main        #C9E7FF
secondary   #416380
accent      #1D3C55
dark        #092033
*/

export default theme;
