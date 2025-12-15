import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "./Icons/MenuIcon";

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

  &:hover + button {
    transform: translateY(70px);
  }
`;

const ListButton = styled.button<{ $show: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: -60px;
  padding: 0;
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.palette.menu};
  color: ${({ theme }) => theme.palette.secondary};
  border: none;
  border-radius: 100%;
  cursor: pointer;

  ${({ $show }) => ($show ? "transform: translateY(70px)" : "")};
  transition: transform 270ms;

  &:hover {
    transform: translateY(70px);
  }
`;

const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 80px;
  right: 600px;
  padding: 0;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.palette.menu};
  color: ${({ theme }) => theme.palette.secondary};
  border: none;
  border-radius: 100%;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fonts.main};
  font-size: ${({ theme }) => theme.typography.fontSizes.body};
`;

const DemoList = () => {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [height, setHeight] = useState("0px");

  const closeWindow = () => {
    setHeight("0px");
    setTimeout(() => setIsOpen(false), 300);
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
      <Trigger />
      <ListButton ref={buttonRef} onClick={() => setIsOpen(!isOpen)} $show={isOpen}>
        <MenuIcon />
      </ListButton>
      {isOpen && (
        <Overlay>
          <Subwindow ref={windowRef} $height={height}>
            <Container>
              <DemoLink to="/">[0] Home</DemoLink>
              <DemoLink to="/photo-dump">[1] Photo Dump</DemoLink>
              <DemoLink to="/word-vortex">[2] Word Vortex</DemoLink>
              <DemoLink to="/">[3] Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
              <DemoLink to="/">Isoi juttui tulos</DemoLink>
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
          <InfoButton>i</InfoButton>
        </Overlay>
      )}
    </Base>
  );
};

export default DemoList;
