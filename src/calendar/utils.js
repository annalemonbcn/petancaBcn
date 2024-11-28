const MIN_HOUR = 8;
const MAX_HOUR = 20;

const getMmonthAndYearFromDate = (date) =>
  date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

const checkToday = (date) => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

const generateHours = () => {
  const hours = [];

  for (let i = MIN_HOUR; i <= MAX_HOUR; i++) {
    const paddedHour = String(i).padStart(2, "0");
    hours.push(`${paddedHour}:00`);
  }

  return hours;
};

const isDisabledDate = (date) => {
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  return date < yesterday;
};

export { getMmonthAndYearFromDate, checkToday, generateHours, isDisabledDate };
