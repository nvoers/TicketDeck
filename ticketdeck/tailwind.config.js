/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ticketdeck-blue": "#007bff",
        "ticketdeck-red": "#dc3545",
        "ticketdeck-blue2": "#003bff",
      },
    },
  },
  plugins: [],
};
