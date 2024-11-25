const checkToday = (currentDate) => {
  if (
    currentDate.getFullYear() === new Date().getFullYear() &&
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getDate() === new Date().getDate()
  )
    return true;

  return false;
};

export { checkToday };
