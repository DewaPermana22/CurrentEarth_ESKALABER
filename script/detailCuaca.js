const elProvinsi = document.querySelector(".detailCuacaProvinsi");
/*
fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
.then(res => res.json())
.then(data => {
    data.forEach(prov => {
        elProvinsi.insertAdjacentHTML("beforeend", `<div class="w-[400px] h-[250px] p-5 bg-home bg-cover bg-center rounded-md relative overflow-hidden">
                <div class="w-full h-full inset-0 absolute bg-black opacity-20"></div>
                <div class="flex">
                    <h1 class="text-[40px] z-[1] relative font-inter tracking-widest font-black  text-slate-50">
                        <i class="bi bi-geo-alt-fill"></i>
                    </h1>
                    <h1 class="text-[40px] z-[1] relative font-inter tracking-widest font-black  text-slate-50">
                        ${prov.name}
                    </h1>
                </div>

                <div class="flex absolute bottom-3">
                    <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
                        <div class="flex items-center mt-4">
                            <h1 class="text-[30px] font-inter font-bold text-slate-900">
                                <i class="bi bi-thermometer-half -mr-[6px]"></i>30
                            </h1>
                            <span class="text-sm font-semibold mr-[2px]">°C</span>
                        </div>
                    </div>
                    <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
                        <div class="flex items-center mt-4">
                            <h1 class="text-[30px] font-inter font-bold text-slate-900">
                                <i class="bi bi-thermometer-half -mr-[6px]"></i>30
                            </h1>
                            <span class="text-sm font-semibold mr-[2px]">°C</span>
                        </div>
                    </div>
                    <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
                        <div class="flex items-center mt-4">
                            <h1 class="text-[30px] font-inter font-bold text-slate-900">
                                <i class="bi bi-thermometer-half -mr-[6px]"></i>30
                            </h1>
                            <span class="text-sm font-semibold mr-[2px]">°C</span>
                        </div>
                    </div>
                    <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
                        <div class="flex items-center mt-4">
                            <h1 class="text-[30px] font-inter font-bold text-slate-900">
                                <i class="bi bi-thermometer-half -mr-[6px]"></i>30
                            </h1>
                            <span class="text-sm font-semibold mr-[2px]">°C</span>
                        </div>
                    </div>

                </div>
            </div>`); 
    });
})*/

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

  
  let prov = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
  prov = await prov.json();
  
  const keyWeather = "009557de2e4fde6c85a552211b808895";
  const keyUnsplash = "89E0dVeOxsAHjszleoWITRpWHmk7eWG3HWk8AAoyd8E";
  prov.forEach(async (p) => {
    let weatherApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${p.name},id&appid=${keyWeather}&lang=id`);
    weatherApi = await weatherApi.json();
    
    let suhu = weatherApi.main.temp;
    suhu = Math.floor(suhu - 273.15);
    
    let cuaca = translateWeatherMain(weatherApi.weather[0].main);
    let ketCuaca =  weatherApi.weather[0].description;
    
    let angin = weatherApi.wind.speed;
    angin = angin.toString();
    angin = angin.length > 3 ? angin.substring(0, 3) : angin;
    let ketAngin = checkWindSpeedNormal(weatherApi.wind.speed);
    
    let posLon = weatherApi.coord.lon;
    let posLat = weatherApi.coord.lat;
    let polusi = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${posLat}&lon=${posLon}&appid=${keyWeather}`);
    polusi = await polusi.json();
    polusi = polusi.list[0].main.aqi;
    let ketPolusi = evaluateAirQuality(polusi);
    
    elProvinsi.insertAdjacentHTML("beforeend", `<div class="w-[400px] h-[250px] p-5 bg-home bg-cover bg-center rounded-md relative overflow-hidden">
                <div class="w-full h-full inset-0 absolute bg-black opacity-20"></div>
                <div class="flex">
                    <h1 class="text-[40px] z-[1] relative font-inter tracking-widest font-black  text-slate-50">
                        <i class="bi bi-geo-alt-fill"></i>
                    </h1>
                    <h1 class="text-[40px] z-[1] relative font-inter tracking-widest font-black  text-slate-50">
                        ${p.name}
                    </h1>
                </div>

                <div class="flex absolute bottom-3">
                    <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
                        <div class="flex items-center mt-4">
                            <h1 class="text-[30px] font-inter font-bold text-slate-900">
                                <i class="bi bi-thermometer-half -mr-[6px]"></i>${suhu}</h1>
                            <span class="text-sm font-semibold mr-[2px]">°C</span>
                        </div>
                    </div>
                    <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
                        <div class="flex items-center mt-4">
                            <h1 class="text-[30px] font-inter font-bold text-slate-900">
                                <i class="bi bi-thermometer-half -mr-[6px]"></i>${cuaca}</h1>
                            <span class="text-sm font-semibold mr-[2px]">°C</span>
                        </div>
                    </div>
                    <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
                        <div class="flex items-center mt-4">
                            <h1 class="text-[30px] font-inter font-bold text-slate-900">
                                <i class="bi bi-thermometer-half -mr-[6px]"></i>${angin}</h1>
                            <span class="text-sm font-semibold mr-[2px]">°C</span>
                        </div>
                    </div>
                    <div class="w-[85px] h-[80px] rounded-md mt-3 mr-[8px] bg-slate-100 relative">
                        <div class="flex items-center mt-4">
                            <h1 class="text-[30px] font-inter font-bold text-slate-900">
                                <i class="bi bi-thermometer-half -mr-[6px]"></i>${polusi}</h1>
                            <span class="text-sm font-semibold mr-[2px]">°C</span>
                        </div>
                    </div>

                </div>
            </div>`); 
    
    
    
  })
  
}
elCuacaProv();