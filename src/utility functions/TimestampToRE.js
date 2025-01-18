export const TimeStampToMonth = (timestamp) => {
  const dateObject = new Date(timestamp);
  const month = dateObject.toLocaleDateString("en-US", { month: "long" });
  return month;
};

export const TimeStampToTime = (timestamp) => {
  const dateObject = new Date(timestamp);

  const options = {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const time = dateObject.toLocaleTimeString("en-US", options);
  return time;
};
export const TimeStampToDay = (timestamp) => {
  const dateObject = new Date(timestamp);
  const day = dateObject.toLocaleDateString("en-US", { weekday: "long" });
  return day;
};

export const TimeStampToYear = (timestamp) => {
  const dateObject = new Date(timestamp);
  const year = dateObject.toLocaleDateString("en-US", { year: "numeric" });
  return year;
};

export const TimeStampToDate = (timestamp) => {
  const dateObject = new Date(timestamp);
  const date = dateObject.toISOString().split("T")[0];
  return date;
};

export const TimeStampToMonthAndDay = (timestamp) => {
  const dateObject = new Date(timestamp);
  const month = dateObject.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  return month;
};
