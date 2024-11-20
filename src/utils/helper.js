export const validateDate = (value) => {
  if (!value) return true;
  const date = new Date(value);
  const today = new Date(); // Ensure the date is not in the future
  if (date > today) {
    return "Date of Birth cannot be in the future.";
  } // Ensure the date is a valid date
  if (isNaN(date.getTime())) {
    return "Please enter a valid date. Format MM/DD/YYYY";
  }
  return true;
};
