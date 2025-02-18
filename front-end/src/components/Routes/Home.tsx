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
  padding: 0 20px;
  width: auto;
  max-width: 30em;
`;

const TutorialImg = styled.img`
  position: fixed;
  top: 90px;
  left: 49%;
  height: 150px;
`;

const Home = () => {
  return (
    <Base>
      <TutorialImg draggable="false" src="src/assets/20250201_233506_2.png" />
      <Page>
        <H1 $whiteFont>DEMO DUMP</H1>
        <P $whiteFont>My visual sandbox.</P>
      </Page>
    </Base>
  );
};

export default Home;
