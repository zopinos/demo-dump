const photoCount = 75;

export const photoPaths = Array.from(
  { length: photoCount },
  (_, i) => `/demo-dump/photos/${String(i).padStart(4, "0")}.jpg`
).reverse();
