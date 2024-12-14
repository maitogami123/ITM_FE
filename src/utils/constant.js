const API_BASE = "http://localhost:5000";
const API_BASE_URL = "http://localhost:5000/api";

const API_ENDPOINTS = {
  staff: `${API_BASE_URL}/staff`,
  auth: `${API_BASE_URL}/auth`,
  user: `${API_BASE_URL}/users`,
  unit: `${API_BASE_URL}/unit`,
  competition: `${API_BASE_URL}/competitions`,
  reward: `${API_BASE_URL}/rewards`,
  position: `${API_BASE_URL}/positions`,
};

export const TeacherGrade = {
  GRADE_I: "V.07.01.01", // Hạng I - 6 bậc, 5 năm/bậc
  GRADE_II: "V.07.01.02", // Hạng II - 8 bậc, 3 năm/bậc
  GRADE_III: "V.07.01.03", // Hạng III - 9 bậc, 2 năm/bậc
};

export const QualificationCode = {
  Gs: "Giáo sư",
  PGs: "Phó giáo sư",
  TS: "Tiến sĩ",
  ThS: "Thạc sĩ",
};

export { API_BASE_URL, API_ENDPOINTS, API_BASE };
