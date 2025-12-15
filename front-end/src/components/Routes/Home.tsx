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

const ButtonHint = styled.div`
  position: fixed;
  top: 7px;
  height: 60px;
  width: 60px;
  border-radius: 100%;
  border-style: dashed;
  border-color: #ffffff;
`

const Home = () => {
  return (
    <Base>
      <ButtonHint />
      <TutorialImg draggable="false" src="src/assets/20250201_233506_2.png" />
      <Page>
        <H1 $whiteFont>DEMO DUMP</H1>
        <P $whiteFont>My visual sandbox.</P>
      </Page>
    </Base>
  );
};

export default Home;
