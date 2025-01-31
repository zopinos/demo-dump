import styled, { keyframes, ThemeProvider } from "styled-components";
import theme from "../../theme";

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: ${(props) => props.theme.palette.primary};
  background-color: ${(props) => props.theme.palette.secondary};
`;

const circle = (radius: string) => keyframes`
  from{
    transform: rotate(${radius}deg) translate(-${radius}px) rotate(-90deg);
  }
  to{
    transform: rotate(${radius + 360}deg) translate(-${radius}px) rotate(-90deg);
  }
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
  radius: number;
  duration: number;
}

const Text = styled.p<TextProps>`
  font-size: ${(props) => ((props.radius - 50) * (60 - 10)) / (400 - 50) + 10}px;
  position: absolute;
  animation: ${(props) => circle(String(props.radius))} ${(props) => props.duration}s linear infinite;
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
  Array.from({ length: length }, () => [
    getRandomArbitrary(minDistance, maxDistance),
    getRandomArbitrary(minDuration, maxDuration)
  ]);

const vortexNumbers = getRandomizedVortexNumbers(100, 50, 400, 2, 3);

const WordVordex = () => {
  return (
    <ThemeProvider theme={theme}>
      <Div>
        {vortexNumbers.map((element, index) => {
          return (
            <Text key={index} radius={element[0]} duration={element[1]}>
              haloo
            </Text>
          );
        })}
      </Div>
    </ThemeProvider>
  );
};

export default WordVordex;
