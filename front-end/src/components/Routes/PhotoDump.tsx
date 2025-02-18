import styled, { createGlobalStyle } from "styled-components";
import { CircleButton, H1 } from "../StyledElements";
import { useEffect, useRef, useState } from "react";
import { Close } from "../Icons";

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
  max-width: 85vw;
  max-height: 85vh;
  object-fit: contain;
  margin: 0 2em;

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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
`;

const CloseButton = styled(CircleButton)`
  position: fixed;
  top: 20px;
  right: 20px;
`;

const PhotoDump = () => {
  const bigImageRef = useRef<HTMLImageElement | null>(null);

  const [imageOpen, setImageOpen] = useState<string | null>(null);
  const [imageIndex, setImageIndexState] = useState<number | null>(null);

  const setImageIndex = (index: number | null) => {
    if (index && index < 0) setImageIndexState(0);
    else if (index && index > posts.length - 1) setImageIndexState(posts.length - 1);
    else setImageIndexState(index);
  };

  const handleOnClick = (event: MouseEvent) => {
    if (bigImageRef.current && !event.composedPath().includes(bigImageRef.current)) {
      setImageOpen(null);
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      setImageOpen(null);
    } else if (event.code === "ArrowRight") {
      setImageIndex(imageIndex !== null ? imageIndex + 1 : null);
    } else if (event.code === "ArrowLeft") {
      setImageIndex(imageIndex !== null ? imageIndex - 1 : null);
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

  useEffect(() => {
    setImageOpen(imageIndex !== null ? posts[imageIndex] : null);
  }, [imageIndex]);

  return (
    <Base>
      <Page>
        <GlobalStyle $disableScroll={!!imageOpen} />
        <H1>PHOTO DUMP</H1>
        <Container>
          {posts.map((post, index) => (
            <Post
              key={post}
              onClick={() => {
                setImageOpen(post);
                setImageIndex(index);
              }}
            >
              <Image src={post} alt="sorry, this will come later" draggable="false" />
              <Highlighting className="overlay" />
            </Post>
          ))}
        </Container>
        {imageOpen && (
          <Overlay>
            <BigImage src={imageOpen} draggable="false" ref={bigImageRef} />
            <CloseButton>
              <Close />
            </CloseButton>
          </Overlay>
        )}
      </Page>
    </Base>
  );
};

export default PhotoDump;
