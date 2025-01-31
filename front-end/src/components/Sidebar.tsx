import { Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../theme";
import { H1, Nav } from "./StyledElements";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
  width: 14em;
  max-height: 100vh;
  overflow-y: auto;
  background-color: ${(props) => props.theme.palette.primary};
  border-color: ${(props) => props.theme.palette.secondary};
  border-right-style: solid;
  border-width: 2px;
`;

const DemoLink = styled(Link)`
  margin: 2px 0;
  padding: 10px 15px;
  color: ${(props) => props.theme.palette.common.white};
  border-radius: 10px;
  text-decoration: none;
  font-family: ${(props) => props.theme.typography.fonts.main};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  font-style: normal;

  &:hover {
    color: ${(props) => props.theme.palette.primary};
    background-color: ${(props) => props.theme.palette.secondary};
  }
`;

const Sidebar = () => {
  return (
    <ThemeProvider theme={theme}>
      <Div>
        <H1>Demos</H1>
        <Nav>
          <DemoLink to="/">home</DemoLink>
          <DemoLink to="/word-vortex">word vortex</DemoLink>
        </Nav>
      </Div>
    </ThemeProvider>
  );
};

export default Sidebar;
