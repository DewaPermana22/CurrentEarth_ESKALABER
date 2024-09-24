const elProvinsi = document.querySelector(".detailCuacaProvinsi");
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
})