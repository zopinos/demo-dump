// @ts-ignore: imported raw markdown without type declarations
import homeReadme from "./components/demos/home/README.md?raw";
// @ts-ignore: imported raw markdown without type declarations
import wordVortexReadme from "./components/demos/word-vortex/README.md?raw";
// @ts-ignore: imported raw markdown without type declarations
import photoDumpReadme from "./components/demos/photo-dump/README.md?raw";

const demoInfo: Record<string, string> = {
  home: homeReadme,
  wordVortex: wordVortexReadme,
  photoDump: photoDumpReadme
};

export default demoInfo;
