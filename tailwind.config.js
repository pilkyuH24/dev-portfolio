module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        funnel: ['"Funnel Sans"', 'sans-serif'],
        gowun: ['"Gowun Dodum"', 'sans-serif'],
        zain: ['"Zain"', 'sans-serif'],
      },
      colors: {
        primary: '#121212',
        secondary: '#ffffff',
      },
    },
  },
  darkMode: 'class',
};
