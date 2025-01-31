import styled from "styled-components";
import { H1, P } from "../StyledElements";

const Div = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.primary};
`;

const Home = () => {
  return (
    <Div>
      <H1>Hello World!</H1>
      <P>I made this website to display things I have played around with.</P>
    </Div>
  );
};

export default Home;
