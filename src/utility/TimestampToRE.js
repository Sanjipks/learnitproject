export const TimeStampToDay = (timestamp) => {
  const dateObject = new Date(timestamp);
  const day = dateObject.toLocaleDateString("en-US", { weekday: "long" });
  return day;
};

export const TimeStampToTime = (timestamp) => {
  const dateObject = new Date(timestamp);
  const time = dateObject.toISOString().split("T")[1].split(".")[0];
  return time;
};

export const TimeStampToDate = (timestamp) => {
  const dateObject = new Date(timestamp);
  const date = dateObject.toISOString().split("T")[0];
  return date;
};
