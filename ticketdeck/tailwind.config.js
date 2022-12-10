/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ticketdeck-blue": "#0035B2",
        "ticketdeck-red": "#dc3545",
        "ticketdeck-blue2": "#003bff",
        "ticketdeck-purple": "#A400B2",
      },
    },
  },
  plugins: [],
};
