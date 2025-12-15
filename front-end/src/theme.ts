import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  borderRadius: "5px",
  palette: {
    common: {
      black: "black",
      white: "white"
    },
    primary: "rgba(22, 22, 26, 1)",
    secondary: "white",
    dark: "rgb(12, 12, 12)",
    menu: "rgba(0,0,0,0.8)"
  },
  typography: {
    fontSizes: {
      body: "18px",
      heading: "42px"
    },
    fonts: {
      main: "Courier New, monospace"
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
dark        rgb(22, 22, 22)
*/

export default theme;
