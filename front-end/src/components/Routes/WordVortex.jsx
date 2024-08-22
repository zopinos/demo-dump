import styled, { keyframes, ThemeProvider } from 'styled-components';
import theme from '../../theme';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: ${props => props.theme.colors.black};
  background-color: ${props => props.theme.colors.white};
`;

const circle = (radius) => keyframes`
  from{
    transform: rotate(${radius}deg) translate(-${radius}px) rotate(-90deg);
  }
  to{
    transform: rotate(${radius+360}deg) translate(-${radius}px) rotate(-90deg);
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

const Text = styled.p`
  font-size: ${props => ((props.radius - 50) * (60 - 10) / (400 - 50)) + 10}px;
  position: absolute;
  animation: ${props => circle(props.radius)} ${props => props.duration}s linear infinite;
`;

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomizedVortexNumbers = (length, minDistance, maxDistance, minDuration, maxDuration) =>
  Array.from({length: length}, () => [
    getRandomArbitrary(minDistance, maxDistance),
    getRandomArbitrary(minDuration, maxDuration)
  ]);

const vortexNumbers = getRandomizedVortexNumbers(100, 50, 400, 2, 3);

const WordVordex = () => {
  return (
    <ThemeProvider theme={theme}>
      <Div>
        {vortexNumbers.map((element, index) => {
          return (<Text key={index} radius={element[0]} duration={element[1]}>haloo</Text>);
        })}
      </Div>
    </ThemeProvider>
  );
};

export default WordVordex;