export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // onload fires when the file is read successfully
    reader.onload = () => resolve(reader.result);

    // onerror fires if something goes wrong
    reader.onerror = (error) => reject(error);

    // Read the file as a Base64-encoded string (Data URL)
    reader.readAsDataURL(file);
  });
};
