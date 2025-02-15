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

const Subwindow = styled.div<{ $height: string }>`
  position: fixed;
  top: 80px;
  background: ${({ theme }) => theme.palette.menu};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 600px;
  overflow-y: auto;
  padding: 0px;
  height: ${({ $height }) => $height};
  transition: height 200ms ease-out;
`;

const Container = styled.div`
  padding: 30px;
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

const Button = styled.button<{ $show: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: -60px;
  padding: 0;
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.palette.menu};
  color: white;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  transform: ${({ $show }) => ($show ? "translateY(70px)" : "translateY(0)")};
  transition: transform 270ms;
`;

const DemoList = () => {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [height, setHeight] = useState("0px");

  const closeWindow = () => {
    setHeight("0px");
    setTimeout(() => setIsOpen(false), 300);
    setTimeout(() => setShowButton(false), 300);
  };

  const handleOnClick = (event: MouseEvent) => {
    if (
      windowRef.current &&
      buttonRef.current &&
      !event.composedPath().includes(windowRef.current) &&
      !event.composedPath().includes(buttonRef.current)
    ) {
      closeWindow();
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" || event.code === "Escape") {
      closeWindow();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setHeight("500px"), 10);
      document.body.addEventListener("click", handleOnClick);
      document.body.addEventListener("keydown", handleOnKeyDown);
      return () => {
        document.body.removeEventListener("click", handleOnClick);
        document.body.removeEventListener("keydown", handleOnKeyDown);
      };
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <Base>
      <Trigger onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} />
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        $show={showButton || isOpen}
        onMouseEnter={() => setShowButton(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 -960 960 960" fill="#ffffff">
          <path d="M240-160q-33 0-56.5-23.5T160-240q0-33 23.5-56.5T240-320q33 0 56.5 23.5T320-240q0 33-23.5 56.5T240-160Zm240 0q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm240 0q-33 0-56.5-23.5T640-240q0-33 23.5-56.5T720-320q33 0 56.5 23.5T800-240q0 33-23.5 56.5T720-160ZM240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400ZM240-640q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Zm240 0q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm240 0q-33 0-56.5-23.5T640-720q0-33 23.5-56.5T720-800q33 0 56.5 23.5T800-720q0 33-23.5 56.5T720-640Z" />
        </svg>
      </Button>
      {isOpen && (
        <Overlay>
          <Subwindow ref={windowRef} $height={height}>
            <Container>
              <DemoLink to="/">Home</DemoLink>
              <DemoLink to="/photo-dump">Photo Dump</DemoLink>
              <DemoLink to="/word-vortex">Word Vortex</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
            </Container>
          </Subwindow>
        </Overlay>
      )}
    </Base>
  );
};

export default DemoList;
