import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Routes/Home";
import Sidebar from "./components/Sidebar";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";
import WordVordex from "./components/Routes/WordVortex";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    height: 100vh;
    color: ${(props) => props.theme.palette.primary};
    background-color: ${(props) => props.theme.palette.secondary};
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
  overflow-x: hidden;
`;

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Page>
          <Views>
            <Sidebar />
            <Content>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/word-vortex" element={<WordVordex />} />
              </Routes>
            </Content>
          </Views>
        </Page>
      </ThemeProvider>
    </Router>
  );
};

export default App;
