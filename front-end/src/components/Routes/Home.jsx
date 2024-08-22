import styled, { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import { H1, P } from '../StyledElements';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  color: ${props => props.theme.colors.black};
  background-color: ${props => props.theme.colors.white};
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
`;

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Page>
        <Div>
          <H1>Hello World!</H1>
          <P>I made this website to display things I have played around with.</P>
        </Div>
      </Page>
    </ThemeProvider>
  );
};

export default Home;