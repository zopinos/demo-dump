import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/demos/home/Home";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";
import WordVortex from "./components/demos/word-vortex/WordVortex";
import DemoList from "./components/DemoList";
import PhotoDump from "./components/demos/photo-dump/PhotoDump";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    height: 100vh;
    color: ${({ theme }) => theme.palette.primary};
    background-color: ${({ theme }) => theme.palette.secondary};
    scrollbar-gutter: stable both-edges;
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
          <Route path="/photo-dump" element={<PhotoDump />} />
        </Routes>
        <DemoList />
      </ThemeProvider>
    </Router>
  );
};

export default App;
