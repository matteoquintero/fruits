/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{ 
        'fruit':{
          100:'#EDF2F7',
          200: "#A0AEC0"
        }
      }      
    }
  },
  plugins: [],
}
