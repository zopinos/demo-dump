import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "./icons/MenuIcon";
import demoInfo, { DemoSection } from "../demoInfo";

const Base = styled.div`
  display: flex;
  justify-content: center;
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

const MenuButton = styled.button<{ $show: boolean }>`
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

const menuHeight = "80%";
const MenuWindow = styled.div<{ $height: string }>`
  position: fixed;
  top: 80px;
  display: flex;
  background: ${({ theme }) => theme.palette.menu};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 60%;
  overflow-y: ${({ $height }) => ($height == "0px" ? "scroll" : "none")};
  padding: 0px;
  height: ${({ $height }) => $height};
  transition: height 200ms ease-out;
`;

const MenuContainer = styled.div<{ $flex: string }>`
  flex: ${({ $flex }) => $flex || "1"};
  display: flex;
  margin: 20px;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.secondary};
  border-width: 1px;
`;

const LinkList = styled.div`
  flex: 1;
  padding: 20px;
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

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px;
  color: ${({ theme }) => theme.palette.secondary};
  font-family: ${({ theme }) => theme.typography.fonts.main};
`;

const DemoList = () => {
  const location = useLocation();
  const windowRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [height, setHeight] = useState("0px");

  const getInfoForRoute = (route: string): DemoSection => {
    switch (route) {
      case "/":
        return demoInfo.home;
      case "/photo-dump":
        return demoInfo.photoDump;
      case "/word-vortex":
        return demoInfo.wordVortex;
      default:
        return demoInfo.home;
    }
  };

  const closeWindow = () => {
    setHeight("0px");
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleOnClick = (event: MouseEvent) => {
    if (
      windowRef.current &&
      menuButtonRef.current &&
      !event.composedPath().includes(windowRef.current) &&
      !event.composedPath().includes(menuButtonRef.current)
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
      setTimeout(() => setHeight(menuHeight), 10);
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
      <MenuButton ref={menuButtonRef} onClick={() => setIsOpen(!isOpen)} $show={isOpen}>
        <MenuIcon />
      </MenuButton>
      {isOpen && (
        <Overlay>
          <MenuWindow ref={windowRef} $height={height}>
            <MenuContainer $flex={"1"}>
              <LinkList>
                <DemoLink to="/">[0] Home</DemoLink>
                <DemoLink to="/photo-dump">[1] Photo Dump</DemoLink>
                <DemoLink to="/word-vortex">[2] Word Vortex</DemoLink>
                <DemoLink to="/">[3] Isoi juttui tulos</DemoLink>
                <DemoLink to="/">Isoi juttui tulos</DemoLink>
                <DemoLink to="/">Isoi juttui tulos</DemoLink>
              </LinkList>
            </MenuContainer>
            <MenuContainer $flex={"2"}>
              <InfoBox>
                <h1>{getInfoForRoute(location.pathname).title}</h1>
                <p>{getInfoForRoute(location.pathname).description}</p>
              </InfoBox>
            </MenuContainer>
          </MenuWindow>
        </Overlay>
      )}
    </Base>
  );
};

export default DemoList;
