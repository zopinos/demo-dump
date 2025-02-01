import styled from "styled-components";
import { H1, P } from "../StyledElements";

const Base = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.primary};
`;

const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30em;
`;

const Img = styled.img`
  position: fixed;
  top: 90px;
  left: 49%;
  height: 150px;
`;

const Home = () => {
  return (
    <Base>
      <Img draggable="false" src="src/assets/20250201_233506_2.png" />
      <Page>
        <H1>Demo Dump</H1>
        <P>Hello and welcome to demo dump! This is a collection of stuff (mostly visual) I have made.</P>
      </Page>
    </Base>
  );
};

export default Home;
