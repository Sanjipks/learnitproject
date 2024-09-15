export const dateFormater = (isoString) => {
  const date = new Date(isoString);
  return (
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );
};
