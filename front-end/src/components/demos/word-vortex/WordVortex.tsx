import styled, { createGlobalStyle, keyframes, ThemeProvider } from "styled-components";
import { useRef } from "react";
import theme from "../../../theme";
import { words } from "../../../constants";
import { CircleButton, H1, P } from "../../StyledElements";
import DownArrowCoolIcon from "../../icons/DownArrowCoolIcon";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #fff2c5;
  }
`;

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50%;
  margin-top: 80px;
  overflow-y: scroll;
  height: 1700px;
`;

const circle = (radius: number) => keyframes`
  from{
    transform: rotate(${radius}deg) translate(-${radius}px) rotate(${-90}deg);
  }
  to{
    transform: rotate(${radius + 360}deg) translate(-${radius}px) rotate(${-90}deg);
  }
`;

const orbit = (radius: number) => keyframes`
  from{
    transform: rotate(${radius}deg) translate(-${radius}px) rotate(${360 - radius}deg);
  }
  to{
    transform: rotate(${radius + 360}deg) translate(-${radius}px) rotate(${0 - radius}deg);
  }
`;

const Container = styled.div`
  position: absolute;
  top: 1300px;
  right: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.primary};
  font-family: "Times New Roman", Times, serif;
`;

/*
--- How to scale from one range to another: ---
S: input
Smin: min input
Smax: max input
G: output
Gmin: min output
Gmax: max output

Formula:
G = ((S - Smin) * (Gmax - Gmin)) / (Smax - Smin) + Gmin
*/

interface TextProps {
  $radius: number;
  $duration: number;
}

const Text = styled.p<TextProps>`
  font-size: ${(props) =>
    ((props.$radius - minDistance) * (maxFontSize - minFontSize)) / (maxDistance - minDistance) + minFontSize}px;
  color: ${(props) => `hsl(0 0 ${100.0 * (0.7 - props.$radius / maxDistance)})`};
  position: absolute;
  animation: ${(props) => circle(props.$radius)} ${(props) => props.$duration}s linear infinite;
`;

interface TextContainerProps {
  $radius: number;
}

const TextContainer = styled.div<TextContainerProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  //animation: ${({ $radius }) => orbit($radius / 5)} 5s linear infinite;
`;

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getRandomizedVortexNumbers = (
  length: number,
  minDistance: number,
  maxDistance: number,
  minDuration: number,
  maxDuration: number
) =>
  Array.from({ length }, () => [
    getRandomArbitrary(minDistance, maxDistance),
    getRandomArbitrary(minDuration, maxDuration),
    Math.floor(Math.random() * words.length)
  ]);

const maxFontSize = 50;
const minFontSize = 10;
const length = 120;
const minDistance = 50;
const maxDistance = 300;
const minDuration = 2;
const maxDuration = 3;
const vortexNumbers = getRandomizedVortexNumbers(length, minDistance, maxDistance, minDuration, maxDuration);

const WordVortex = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <Content>
          <H1>Word Vortex</H1>
          <P>You can find the Word Vortex down below.</P>
          <P>
            <b>Beware:</b> Looking at the Word Vortex for a prolonged time will result in a{" "}
            <a href="https://en.wikipedia.org/wiki/Motion_aftereffect" target="_blank">
              motion aftereffect
            </a>
            . That is, after looking at the spiralling text for a while and then looking at something stationary, visual
            movement can be seen to appear to the opposite direction.
          </P>
          <CircleButton onClick={handleScrollClick} style={{ marginTop: "50px" }}>
            <DownArrowCoolIcon />
          </CircleButton>
          <Container ref={containerRef}>
            {vortexNumbers.map((element, index) => {
              return (
                <TextContainer key={index} $radius={element[0]}>
                  <Text key={index} $radius={element[0]} $duration={element[1]}>
                    {words[element[2]]}
                  </Text>
                </TextContainer>
              );
            })}
          </Container>
        </Content>
      </Page>
    </ThemeProvider>
  );
};

export default WordVortex;
