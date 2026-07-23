/*
const imageModules = import.meta.glob("/public/photodump/*.{png,jpg}", { eager: true });

export const imagePaths = Object.keys(imageModules);
*/

const imageCount = 75;

export const imagePaths = Array.from(
  { length: imageCount },
  (_, i) => `/demo-dump/photodump/${String(i).padStart(4, "0")}.jpg`
);
