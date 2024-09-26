/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html","script/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'poppins' : ['Poppins'],
        'inter' : ['Inter'],
        'poppins-bold' : ['Poppins-Bold'],
        'lexend' : ['Lexend']
      },
      backgroundImage: {
        'home': "url('../assets/img/bg-hero.jpg')",
        'Sensor' : "url('../assets/img/sensor-udara.jpeg')",
        'robot' : "url('../assets/img/robot.webp')",
      },
      keyframes: {
        breathing: {
          '0%, 100%': { transform: 'translateY(-15px)' },  
          '50%': { transform: 'translateY(15px)' },   
        },
      },
      animation: {
        breathing: 'breathing 5s ease-in-out infinite',  // durasi 2 detik, infinite loop
      },
    },
  },
  plugins: [],
}