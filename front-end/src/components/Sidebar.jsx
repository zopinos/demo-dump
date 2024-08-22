import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { H1, Nav } from './StyledElements';

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

const DemoLink = styled(Link)`
  margin: 0;
  padding: 10px 15px;
  color: ${props => props.theme.colors.white};
  border-radius: 10px;
  text-decoration: none;
  font-family: ${props => props.theme.fonts.main};
  font-weight: ${props => props.theme.fontWeights.bold};
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
          <DemoLink to='/word-vortex'>word vortex</DemoLink>
        </Nav>
      </Div>
    </ThemeProvider>
  );
};

export default Sidebar;