import { photoPaths } from "./photoPaths";

const photoCount = photoPaths.length;

export const thumbnailPaths = Array.from(
  { length: photoCount },
  (_, i) => `/demo-dump/thumbnails/${String(i).padStart(4, "0")}.jpg`
).reverse();
