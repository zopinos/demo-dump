const imageModules = import.meta.glob("/public/photodump/*.{png,jpg}", { eager: true });

export const imagePaths = Object.keys(imageModules);
