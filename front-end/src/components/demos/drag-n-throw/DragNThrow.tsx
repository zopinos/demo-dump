import { createGlobalStyle } from "styled-components";
import PhysicsDemo from "./PhysicsDemo";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #01020c;
  }
`;

const DragNThrow = () => {
  return (
    <div>
      <GlobalStyle />
      <PhysicsDemo />
    </div>
  );
};

export default DragNThrow;
