import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../theme';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
  width: 14em;
  max-height: 100vh;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.secondary};

  border-color: ${props => props.theme.colors.accentLight};
  border-right-style: solid;
  border-width: 2px;
`;

const H1 = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-style: normal;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const DemoLink = styled(Link)`
  margin: 0;
  padding: 10px 15px;
  color: ${props => props.theme.colors.white};
  border-radius: 10px;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-style: normal;

  &:hover {
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
  }
`;

const Sidebar = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <Div>
        <H1>Demos</H1>
        <Nav>
          <DemoLink to='/'>home</DemoLink>
          <DemoLink to='/1'>first thing</DemoLink>
        </Nav>
      </Div>
    </ThemeProvider>
  );
};

export default Sidebar;