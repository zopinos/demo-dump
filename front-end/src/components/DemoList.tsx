import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Base = styled.div`
  display: flex;
  justify-content: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //background: rgba(0, 0, 0, 0.5);
`;

const Subwindow = styled.div`
  background: ${({ theme }) => theme.palette.primary};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
`;

const DemoLink = styled(Link)`
  display: block;
  padding: 10px;
  color: ${({ theme }) => theme.palette.secondary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  padding: 10px 15px;
  background: ${({ theme }) => theme.palette.dark};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DemoList = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Base>
      {!isOpen ? (
        <ToggleButton onClick={() => setIsOpen(!isOpen)}>Open Menu</ToggleButton>
      ) : (
        <Overlay>
          <ToggleButton onClick={() => setIsOpen(!isOpen)}>Open Menu</ToggleButton>
          <Subwindow>
            <DemoLink to="/">Home</DemoLink>
            <DemoLink to="/word-vortex">Word Vortex</DemoLink>
            <DemoLink to="/game">Game</DemoLink>
            <DemoLink to="/settings">Settings</DemoLink>
            <DemoLink to="/profile">Profile</DemoLink>
            <DemoLink to="/help">Help</DemoLink>
          </Subwindow>
        </Overlay>
      )}
    </Base>
  );
};

export default DemoList;
