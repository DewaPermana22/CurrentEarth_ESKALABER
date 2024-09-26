const elProvinsi = document.querySelector(".detailCuacaProvinsi");

const elCuacaProv = async () => {
  function translateWeatherMain(cuaca) {
    const translations = {
        "clear": "Cerah",
        "clouds": "Berawan",
        "rain": "Hujan",
        "drizzle": "Gerimis",
        "thunderstorm": "Badai Petir",
        "snow": "Salju",
        "mist": "Kabut",
        "smoke": "Asap",
        "haze": "Kabut Asap",
        "dust": "Debu",
        "fog": "Kabut Tebal",
        "sand": "Pasir",
        "ash": "Abu Vulkanik",
        "squall": "Angin Kencang",
        "tornado": "Tornado"
    };

    return translations[cuaca.toLowerCase()] || cuaca;
  }

  function getWeatherIcon(cuaca) {
    const icons = {
        "cerah": "bi-sun-fill",
        "berawan": "bi-cloud-fill",
        "hujan": "bi-cloud-rain-fill",
        "gerimis": "bi-cloud-drizzle-fill",
        "badai petir": "bi-cloud-lightning-fill",
        "salju": "bi-snow2",
        "kabut": "bi-cloud-fog-fill",
        "asap": "bi-cloud-haze2-fill"
    };

    return icons[cuaca.toLowerCase()] || "bi-question-circle-fill";
  }

  function checkWindSpeedNormal(windSpeed) {
    if (windSpeed >= 1.6 && windSpeed <= 5.4) {
        return "Angin normal";
    } else if (windSpeed < 1.6) {
        return "Angin lemah";
    } else if (windSpeed > 5.4 && windSpeed <= 10.7) {
        return "Angin kencang";
    } else {
        return "Angin badai";
    }
  }
  
  function evaluateAirQuality(aqi) {
    if (aqi === 1) {
      return "Bagus";
    } else if (aqi === 2) {
      return "Cukup Baik";
    } else if (aqi === 3) {
      return "Kurang Baik";
    } else if (aqi === 4) {
      return "Tidak Baik";
    } else if (aqi === 5) {
      return "Tidak Sehat";
    } else {
      return "Nilai AQI tidak valid";
    }
  }

  function getPolutionIcon(aqi) {
    if (aqi === 1) {
      return "material-icons text-green-600"; // Bagus
    } else if (aqi === 2) {
      return "material-icons text-yellow-600"; // Cukup Baik
    } else if (aqi === 3) {
      return "material-icons text-orange-600"; // Kurang Baik
    } else if (aqi === 4) {
      return "material-icons text-red-600"; // Tidak Baik
    } else if (aqi === 5) {
      return "material-icons text-purple-600"; // Tidak Sehat
    } else {
      return "material-icons text-gray-600"; // Tidak valid
    }
  }

  let prov = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
  prov = await prov.json();

  const keyWeather = "009557de2e4fde6c85a552211b808895";
  prov.forEach(async (p) => {
    let weatherApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${p.name},id&appid=${keyWeather}&lang=id`);
    weatherApi = await weatherApi.json();

    let suhu = weatherApi.main.temp;
    suhu = Math.floor(suhu - 273.15);

    let cuaca = translateWeatherMain(weatherApi.weather[0].main);
    let ikonCuaca = getWeatherIcon(cuaca);  // Mendapatkan ikon sesuai cuaca
    let angin = weatherApi.wind.speed;
    angin = angin.toString().substring(0, 3);
    let ketAngin = checkWindSpeedNormal(weatherApi.wind.speed);

    let posLon = weatherApi.coord.lon;
    let posLat = weatherApi.coord.lat;
    let polusi = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${posLat}&lon=${posLon}&appid=${keyWeather}`);
    polusi = await polusi.json();
    polusi = polusi.list[0].main.aqi;
    let ketPolusi = evaluateAirQuality(polusi);
    let ikonPolusi = getPolutionIcon(polusi);


    elProvinsi.insertAdjacentHTML("beforeend", `
      <div class="w-full sm:w-[400px] h-[250px] p-5 bg-home bg-cover bg-center rounded-md relative overflow-hidden">
        <div class="w-full h-full inset-0 absolute bg-black opacity-20"></div>
        <div class="flex">
          <h1 class="text-[30px] sm:text-[30px] z-[1] relative font-inter tracking-widest font-black text-slate-50">
            <i class="bi bi-geo-alt-fill"></i> ${p.name}
          </h1>
        </div>
        <div class="flex absolute bottom-3">
          <div class="w-[70px] sm:w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
            <div class="flex justify-center items-center mt-4">
              <h1 class="text-[20px] sm:text-[25px] font-inter font-bold text-slate-900">
                <i class="bi bi-thermometer-half -mr-[6px]"></i> ${suhu}</h1>
              <span class="text-sm font-semibold mr-[2px]">°C</span>
            </div>
          </div>
          <div class="w-[70px] sm:w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
            <div class="flex flex-col justify-center items-center mx-auto">
              <i class="bi ${ikonCuaca} text-[30px] text-center sm:text-[27px] text-slate-900"></i>
              <h1 class="text-[16px] sm:text-[17px] font-poppins font-semibold text-slate-900">${cuaca}</h1>
            </div>
          </div>
          <div class="w-[70px] sm:w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
            <div class="flex flex-col justify-center text-center items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="29px" viewBox="0 -960 960 960" width="39px" fill="#000"><path d="M750-614q-27 27-62 41t-70 14q-35 0-69-13.5T488-614l-75-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T267-689l-75 75-57-57 75-75q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-746l75 75q16 16 35 23.5t39 7.5q20 0 39.5-7.5T693-671l75-75 57 57-75 75Zm0 200q-27 27-61.5 40.5T619-360q-35 0-69.5-13.5T488-414l-75-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T267-489l-75 75-57-56 75-76q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-546l75 75q16 16 35 23.5t39 7.5q20 0 39.5-7.5T693-471l75-75 57 57-75 75Zm-1 200q-27 27-61 40.5T619-160q-35 0-69.5-13.5T488-214l-76-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T266-289l-75 75-56-56 75-76q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-346l75 75q16 16 35.5 23.5T619-240q20 0 39-7.5t35-23.5l75-75 56 57-75 75Z"/></svg>
              <h1 class="text-[18px] sm:text-[20px] font-inter font-bold text-slate-900">
                ${angin} m/s</h1>
            </div>
          </div>
           <div class="w-[70px] sm:w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
            <div class="flex flex-col items-center mt-4">
              <i class="${ikonPolusi} text-[40px] sm:text-[50px]"></i>

              <span class="text-[12px] font-inter font-semibold text-slate-900">${ketPolusi}</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    `); 
  });
}
elCuacaProv();
