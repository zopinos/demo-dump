import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

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
  position: fixed;
  top: 90px;
  background: ${({ theme }) => theme.palette.dark};
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
  font-family: ${({ theme }) => theme.typography.fonts.main};
`;

const Trigger = styled.div`
  position: fixed;
  top: 0;
  height: 90px;
  width: 150px;
`;

const Button = styled.button<{ show: boolean }>`
  position: fixed;
  top: -40px;
  padding: 10px 15px;
  background: ${({ theme }) => theme.palette.dark};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transform: ${({ show }) => (show ? "translateY(70px)" : "translateY(0)")};
  transition: transform 400ms;
`;

const DemoList = () => {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleOnClick = (event: MouseEvent) => {
    if (
      windowRef.current &&
      buttonRef.current &&
      !event.composedPath().includes(windowRef.current) &&
      !event.composedPath().includes(buttonRef.current)
    ) {
      setIsOpen(false);
      setShowButton(false);
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" || event.code === "Escape") {
      setIsOpen(false);
      setShowButton(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener("click", handleOnClick);
      document.body.addEventListener("keydown", handleOnKeyDown);
      return () => {
        document.body.removeEventListener("click", handleOnClick);
        document.body.removeEventListener("keydown", handleOnKeyDown);
      };
    }
  }, [isOpen]);

  return (
    <Base>
      <Trigger onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} />
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        show={showButton}
        onMouseEnter={() => setShowButton(true)}
      >
        Open Menu
      </Button>
      {isOpen && (
        <Overlay>
          <Subwindow ref={windowRef}>
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
