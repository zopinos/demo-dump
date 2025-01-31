import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string | number;

    palette: {
      common: {
        black: string;
        white: string;
      };
      primary: string;
      secondary: string;
    };

    typography: {
      fontSizes: {
        body: string;
        heading: string;
      };
      fonts: {
        main: string;
      };
      fontWeights: {
        normal: string | number;
        bold: number;
      };
    };
  }
}
