export interface DemoSection {
  title: string;
  description: string;
}

const demoInfo: Record<string, DemoSection> = {
  home: {
    title: "demo-dump",
    description: "Content. Another line."
  },
  wordVortex: {
    title: "Word Vortex",
    description: "This is word vortex."
  },
  photoDump: {
    title: "Photo Dump",
    description: "This is photo dump."
  }
};

export default demoInfo;
