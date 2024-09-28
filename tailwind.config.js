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
        'drone' : "url('../assets/img/drone-1866742_640.jpg')",
        'sea-bin': "url('../assets/img/seabin-artc.jpg')",
        'bg-cuaca' : "url('../assets/img/ID-EPS-02-0001.png')",
        'sumut' : "url('../assets/img/sumut.jpg')",
        'sumtim' : "url('../assets/img/sumatera-timur.jpg')",
        'sumbar' : "url('../assets/img/sumbar.jpeg')",
        'sumsel' : "url('../assets/img/sumsel.jpg')",
        'aceh' : "url('../assets/img/aceh.jpeg')",
        'bengkulu' : "url('../assets/img/bengkulu.jpg')",
        'jambi' : "url('../assets/img/jambi.png')",
        'riau' : "url('../assets/img/riau.jpg')",
        'jatim' : "url('../assets/img/jatim.jpeg')",
        'jateng' : "url('../assets/img/jateng.jpeg')",
        'jabar' : "url('../assets/img/jabar.jpg')",
        'bangka_belitung' : "url('../assets/img/bb.jpeg')",
        'kep-riau' : "url('../assets/img/kep riau.jpg')",
        'lampung' : "url('../assets/img/lampung.jpg')",
        'banten' : "url('../assets/img/banten.jpg')",
        'bali' : "url('../assets/img/bali.jpeg')",
        'kaltim' : "url('../assets/img/kaltim.jpg')",
        'kalbar' : "url('../assets/img/kalbar.jpg')",
        'ntbar' : "url('../assets/img/ntbar.jpeg')",
        'sulsel' : "url('../assets/img/sulsel.jpeg')",
        'sulteng' : "url('../assets/img/sulteng.jpeg')",
        'sultra' : "url('../assets/img/sultra.jpeg')",
        'kalsel' : "url('../assets/img/kalsel.jpeg')",
        'sultenggara' : "url('../assets/img/sultenggara.jpeg')",
        'gorontalo' : "url('../assets/img/gorontalo.jpeg')",
        'maluku' : "url('../assets/img/maluku.jpeg')",
        'papua' : "url('../assets/img/papua.jpg')",

      },
      keyframes: {
        breathing: {
          '0%, 100%': { transform: 'translateY(-15px)' },  
          '50%': { transform: 'translateY(15px)' },   
        },
      },
      animation: {
        breathing: 'breathing 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}