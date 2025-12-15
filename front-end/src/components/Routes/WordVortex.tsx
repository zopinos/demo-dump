import styled, { createGlobalStyle, keyframes, ThemeProvider } from "styled-components";
import theme from "../../theme";
import { words } from "../../constants";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #fff2c5;
  }
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.primary};
  font-family: 'Times New Roman', Times, serif;
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
  font-size: ${(props) => ((props.$radius - 50) * (60 - 10)) / (400 - 50) + 10}px;
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

const vortexNumbers = getRandomizedVortexNumbers(150, 50, 400, 2, 3);

const WordVortex = () => {
  document.body.style.backgroundColor = '#fff2c5;';

  return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
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
      </ThemeProvider>
  );
};

export default WordVortex;
