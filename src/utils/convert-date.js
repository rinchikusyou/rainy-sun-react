export const convertDate = (date) => {
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  });
  return dateFormat.format(Number(date + "000"));
};
