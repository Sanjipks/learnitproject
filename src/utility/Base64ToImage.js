export const base64StringToImage = (base64String, mimeType = "image/jpeg") => {
  return `data:${mimeType};base64,${base64String}`;
};
