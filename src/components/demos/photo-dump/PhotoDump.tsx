import styled, { createGlobalStyle } from "styled-components";
import { CircleButton, H1, P } from "../../StyledElements";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "../../icons/CloseIcon";
import { photoPaths } from "./photoPaths";
import RightArrowIcon from "../../icons/RightArrowIcon";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import { thumbnailPaths } from "./thumbnailPaths";

const photosPerPage = 15;
const pageCount = Math.ceil(photoPaths.length / photosPerPage);

const GlobalStyle = createGlobalStyle<{ $disableScroll: boolean }>`
  html,
  body {
    overflow: ${({ $disableScroll }) => ($disableScroll ? "hidden" : "auto")};
    background-color: ${({ theme }) => theme.palette.light};
  }
`;

const Base = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const PageBottom = styled.div`
  margin: 50px 0;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  aspect-ratio: 1 / 1;

  &:hover .overlay {
    opacity: 1;
  }
`;

const Thumbnail = styled.img`
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
  opacity: 0;
  transition: opacity 0.2s;
`;

const FullPhoto = styled.img`
  max-width: 70vw;
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

const RightArrowButton = styled(CircleButton)`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translate(0%, -50%);
`;

const LeftArrowButton = styled(RightArrowButton)`
  left: 20px;
`;

const PhotoDump = () => {
  const fullPhotoRef = useRef<HTMLImageElement | null>(null);
  const leftArrowRef = useRef<HTMLButtonElement | null>(null);
  const rightArrowRef = useRef<HTMLButtonElement | null>(null);

  const [photoOpen, setPhotoOpen] = useState<string | null>(null);
  const [photoIndex, setPhotoIndexState] = useState<number | null>(null);
  const [photosPage, setPhotosPage] = useState<number>(0);

  const setPhotoIndex = (index: number | null) => {
    if (index && index < 0) setPhotoIndexState(0);
    else if (index && index > photoPaths.length - 1) setPhotoIndexState(photoPaths.length - 1);
    else setPhotoIndexState(index);
  };

  const handleOnClick = (event: MouseEvent) => {
    if (
      fullPhotoRef.current &&
      !event.composedPath().includes(fullPhotoRef.current) &&
      leftArrowRef.current &&
      !event.composedPath().includes(leftArrowRef.current) &&
      rightArrowRef.current &&
      !event.composedPath().includes(rightArrowRef.current)
    ) {
      setPhotoOpen(null);
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      setPhotoOpen(null);
    } else if (event.code === "ArrowLeft") {
      setPhotoIndex(photoIndex !== null ? photoIndex - 1 : null);
    } else if (event.code === "ArrowRight") {
      setPhotoIndex(photoIndex !== null ? photoIndex + 1 : null);
    }
  };

  useEffect(() => {
    if (photoOpen) {
      setTimeout(() => {
        document.body.addEventListener("click", handleOnClick);
        document.body.addEventListener("keydown", handleOnKeyDown);
      }, 10);

      return () => {
        document.body.removeEventListener("click", handleOnClick);
        document.body.removeEventListener("keydown", handleOnKeyDown);
      };
    }
  }, [photoOpen]);

  useEffect(() => {
    setPhotoOpen(photoIndex !== null ? photoPaths[photoIndex] : null);
  }, [photoIndex]);

  return (
    <Base>
      <Page>
        <GlobalStyle $disableScroll={!!photoOpen} />
        <H1>PHOTO DUMP</H1>
        <Container>
          {photoPaths.slice(photosPerPage * photosPage, photosPerPage * (photosPage + 1)).map((photoPath, index) => {
            const photoPathIndex = photosPerPage * photosPage + index;
            return (
              <ThumbnailContainer
                key={photoPath}
                onClick={() => {
                  setPhotoOpen(photoPath);
                  setPhotoIndex(photoPathIndex);
                }}
              >
                <Thumbnail src={thumbnailPaths[photoPathIndex]} alt="loading..." draggable="false" />
                <Highlighting className="overlay" />
              </ThumbnailContainer>
            );
          })}
        </Container>
        {photoOpen && (
          <Overlay>
            <FullPhoto src={photoOpen} draggable="false" ref={fullPhotoRef} />
            <CloseButton>
              <CloseIcon />
            </CloseButton>
            <LeftArrowButton
              ref={leftArrowRef}
              onClick={() => {
                setPhotoIndex(photoIndex !== null ? photoIndex - 1 : null);
              }}
            >
              <LeftArrowIcon />
            </LeftArrowButton>
            <RightArrowButton
              ref={rightArrowRef}
              onClick={() => {
                setPhotoIndex(photoIndex !== null ? photoIndex + 1 : null);
              }}
            >
              <RightArrowIcon />
            </RightArrowButton>
          </Overlay>
        )}
        <Pagination>
          {[...Array(pageCount).keys()].map((index) => (
            <CircleButton key={index} onClick={() => setPhotosPage(index)} $selected={index === photosPage}>
              <P $whiteFont={index !== photosPage}>{index + 1}</P>
            </CircleButton>
          ))}
        </Pagination>
        <PageBottom></PageBottom>
      </Page>
    </Base>
  );
};

export default PhotoDump;
