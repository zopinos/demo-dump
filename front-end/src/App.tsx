import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Routes/Home";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";
import WordVortex from "./components/Routes/WordVortex";
import DemoList from "./components/DemoList";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    height: 100vh;
    color: ${({ theme }) => theme.palette.primary};
    background-color: ${({ theme }) => theme.palette.secondary};
  }
  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word-vortex" element={<WordVortex />} />
        </Routes>
        <DemoList />
      </ThemeProvider>
    </Router>
  );
};

export default App;
