type TranslateFn = (key: string) => string;

// ImageSource with be a string starting with "/" then a string
type ImageSource = string;

export const getImage = (t: TranslateFn, image: string): ImageSource => {
  return "/" + t(image);
};
