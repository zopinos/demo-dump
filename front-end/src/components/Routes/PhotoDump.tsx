import styled, { createGlobalStyle } from "styled-components";
import { H1 } from "../StyledElements";
import { useEffect, useRef, useState } from "react";

const imagePaths = Array.from({ length: 32 }, (_, i) => `/photodump/${i}.jpg`);

const posts = imagePaths.map((path) => path).reverse();

const GlobalStyle = createGlobalStyle<{ $disableScroll: boolean }>`
  html,
  body {
    overflow: ${({ $disableScroll }) => ($disableScroll ? "hidden" : "auto")};
  }
`;

const Base = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.common};
`;

const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 5em;
  width: 100%;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 20px;
  max-width: 700px;
  margin: 3em 0;
`;

const Post = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;

  &:hover .overlay {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Highlighting = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
`;

const BigImage = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 85vw;
  max-height: 85vh;
  object-fit: contain;

  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
  background: rgba(0, 0, 0, 0.8);
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 0;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background: rgb(0, 0, 0);
  }
`;

const PhotoDump = () => {
  const bigImageRef = useRef<HTMLImageElement | null>(null);

  const [imageOpen, setImageOpen] = useState<string | null>(null);

  const handleOnClick = (event: MouseEvent) => {
    if (bigImageRef.current && !event.composedPath().includes(bigImageRef.current)) {
      setImageOpen(null);
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" || event.code === "Escape") {
      setImageOpen(null);
    }
  };

  useEffect(() => {
    if (imageOpen) {
      setTimeout(() => {
        document.body.addEventListener("click", handleOnClick);
        document.body.addEventListener("keydown", handleOnKeyDown);
      }, 10);

      return () => {
        document.body.removeEventListener("click", handleOnClick);
        document.body.removeEventListener("keydown", handleOnKeyDown);
      };
    }
  }, [imageOpen]);

  return (
    <Base>
      <Page>
        <GlobalStyle $disableScroll={!!imageOpen} />
        <H1>PHOTO DUMP</H1>
        <Container>
          {posts.map((post) => (
            <Post key={post} onClick={() => setImageOpen(post)}>
              <Image src={post} alt="sorry, this will come later" draggable="false" />
              <Highlighting className="overlay" />
            </Post>
          ))}
        </Container>
        {imageOpen && (
          <Overlay>
            <BigImage src={imageOpen} draggable="false" ref={bigImageRef} />
            <CloseButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </CloseButton>
          </Overlay>
        )}
      </Page>
    </Base>
  );
};

export default PhotoDump;
