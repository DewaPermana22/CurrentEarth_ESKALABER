const elProvinsi = document.querySelector(".detailCuacaProvinsi");
const loadingSpinner = document.querySelector(".loading-spinner");
const elCuacaProv = async () => {

  loadingSpinner.classList.remove("hidden");
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

    let bgProv = "";
    switch (p.name.toLowerCase()) {
      case "sumatera utara":
        bgProv = "bg-sumut";
        break;
        case "sumatera barat":
        bgProv = "bg-sumbar";
        break;
        case "sumatera selatan":
        bgProv = "bg-sumsel";
        break;
        case  "aceh":
        bgProv = "bg-aceh";
        break;
        case "bengkulu":
        bgProv = "bg-bengkulu";
        break;
        case "jambi":
        bgProv = "bg-jambi";
        break;
        case "riau":
        bgProv = "bg-riau";
        break;
        case "kepulauan riau":
        bgProv = "bg-kep-riau";
        break;
        case "lampung":
        bgProv = "bg-lampung";
        break;
        case "jawa barat":
        bgProv = "bg-jabar";
        break;
        case "jawa tengah":
        bgProv = "bg-jateng";
        break;
        case "jawa timur":
        bgProv = "bg-jatim";
        break;
        case "banten":
        bgProv = "bg-banten";
        break;
        case "bali":
        bgProv = "bg-bali";
        break;
        case "kalimantan barat":
        bgProv = "bg-kaltim";
        break;
        case "kalimantan timur":
        bgProv = "bg-kalbar";
        break;
        case "kalimantan selatan":
        bgProv = "bg-kalsel";
        break;
        case "sulawesi utara":
        bgProv = "bg-sultra";
        break;
        case "sulawesi selatan":
        bgProv = "bg-sulsel";
        break;
        case "sulawesi tenggara":
        bgProv = "bg-sultenggara";
        break;
        case "sulawesi tengah":
        bgProv = "bg-sulteng";
        break;
        case "gorontalo":
        bgProv = "bg-gorontalo";
        break;
        case "maluku":
        bgProv = "bg-maluku";
        break;
        case "papua":
        bgProv = "bg-papua";
        break;
        case "kepulauan bangka belitung":
        bgProv = "bg-bangka_belitung";
        break;
        default:
          bgProv = "bg-home";
          break;
    }
    elProvinsi.insertAdjacentHTML("beforeend", `
      <div class="w-full sm:w-[400px] h-[250px] p-5 ${bgProv} bg-cover  rounded-md relative overflow-hidden">
        <div class="w-full h-full inset-0 absolute bg-black opacity-20"></div>
        <div class="flex">
          <h1 class="text-[30px] z-[1] relative font-inter  font-semibold text-slate-50">
            <i class="bi bi-geo-alt-fill"></i> ${p.name}
          </h1>
        </div>
        <div class="flex absolute bottom-3">
          <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
            <div class="flex justify-center items-center mt-5">
              <h1 class="text-[25px] font-inter font-bold text-slate-900">
                <i class="bi bi-thermometer-half -mr-[6px]"></i> ${suhu}</h1>
              <span class="text-sm font-semibold mr-[2px]">°C</span>
            </div>
          </div>
          <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
            <div class="flex flex-col justify-center items-center mx-auto">
              <i class="bi ${ikonCuaca} mt-3 text-center text-[27px] text-slate-900"></i>
              <h1 class="text-[15px] font-poppins font-semibold text-slate-900">${cuaca}</h1>
            </div>
          </div>
          <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
            <div class="flex flex-col justify-center text-center items-center mt-2">
           <i class="bi bi-wind text-[27px] text-slate-900"></i>
              <h1 class="text-[15px] font-inter font-bold text-slate-900">
                ${angin} m/s</h1>
            </div>
          </div>
           <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
            <div class="flex flex-col items-center mt-4">
              <i class="text-[27px] text-slate-900 bi bi-cloud-haze2-fill"></i>

              <span class="text-[13px] font-inter font-semibold text-slate-900">${ketPolusi}</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    `); 
  });

  loadingSpinner.classList.add("hidden");

}
elCuacaProv();
