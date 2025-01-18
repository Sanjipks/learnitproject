// export const bufferToImage = (buffer) => {
//   let binary = "";
//   const bytes = new Uint8Array(buffer);
//   const len = bytes.byteLength;
//   for (let i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   const base64String = window.btoa(binary);
//   return `data:image/jpeg;base64,${base64String}`;
// };

export const bufferToImage = (buffer, mimeType = "image/jpeg") => {
  // convert buffer to binary string using Uint8Array
  const base64String = btoa(
    String.fromCharCode.apply(null, new Uint8Array(buffer))
  );

  // return the base64-encoded image
  return `data:${mimeType};base64,${base64String}`;
};
