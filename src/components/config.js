const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://sherise.club:5002" // Production IP and port
    : "http://localhost:5000"; // Local development server

export default API_URL;
