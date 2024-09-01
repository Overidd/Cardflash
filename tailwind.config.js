/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: '#a6a6a6',
        greySegundary: '#2e3856',
        red: '#ff5757',
        yellow: '#ff914d',
        green: '#00bf63',
        default: '#373737',
        gray: '#5a5a5a',
        blue: '#1f466a',
        purple: '#67527b',
        brown: '#633b2e',
        orange: '#8a4b24',
        pink: '#6d324b',
        primaryBlue: '#0454bf',
        secondaryBlue: '#3066cf',
        tertiaryBlue: '#3066cf',
        quaternaryBlue: '#497fe8',
        bgColorPrimary: "#0a092d",
        bgColorSegundary: "#131742",
        bgColorTertiary: "#121f4b"

      },
      backgroundImage: {
        // rangeBlueAndSky: 'linear-gradient(90deg, #104882 0%, #005dd8 100%)',
        // rangeGreenAndSky: 'linear-gradient(90deg, #108f8f 0%, #1e93a8 100%)',
        // rangeBlueAndSky: '#131742 ', 
        // rangeGreenAndSky: '#131742 ',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
    gridTemplateRows: {
      '3-custon': '7rem 1rem minmax(0, 1fr)',
    }
  },
  plugins: [],
}

