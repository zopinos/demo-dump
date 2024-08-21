import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Routes/Home';
import First from './components/Routes/First';
import Sidebar from './components/Sidebar';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    height: 100vh;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.main};
    overflow: hidden;
  }
`;

const Page = styled.div`
  display: flex;
  height: 100vh;
`;

const Views = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const App = () => {

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
      </ThemeProvider>
      <Page>
        <Views>
          <Sidebar />
          <Content>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/1' element={<First />} />
            </Routes>
            <p>
              This is some text.
            </p>
          </Content>
        </Views>
      </Page>
    </Router>
  );
};

export default App;
