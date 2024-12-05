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

export function formatDate(dateString) {
  const date = new Date(dateString);

  // Lấy ngày trong tuần theo định dạng 'Thứ'
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = days[date.getDay()];

  // Format ngày tháng năm
  const formattedDate = date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return `${dayOfWeek}, ${formattedDate}`;
}
