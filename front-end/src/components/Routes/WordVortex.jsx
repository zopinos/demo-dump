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

const Text = styled.p`
  position: absolute;
  animation: ${props => circle(props.radius)} ${props => props.duration}s linear infinite;
`;

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};


const getRandomizedArray = (length, minDistance, maxDistance, minDuration, maxDuration) =>
  Array.from({length: length}, () => [
    getRandomArbitrary(minDistance, maxDistance),
    getRandomArbitrary(minDuration, maxDuration)
  ]);

const WordVordex = () => {
  return (
    <ThemeProvider theme={theme}>
      <Div>
        {getRandomizedArray(200, 50, 400, 0.5, 2).map((element, index) => {
          return (<Text key={index} radius={element[0]} duration={element[1]}>haloo</Text>);
        })}
      </Div>
    </ThemeProvider>
  );
};

export default WordVordex;