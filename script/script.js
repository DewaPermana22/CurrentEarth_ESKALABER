const nav = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const btnNav = document.querySelector("#btn-nav");
const linkNav = document.querySelector(".linknav");

const hamburgerButton = document.querySelector(".hamburgerButton");
hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('diklik');
    nav.classList.toggle('diklik');
})

function calculateScrollPercentage(sectionProyek, scrollOffset) {
    const sectionTop = sectionProyek.offsetTop;
    const sectionHeight = sectionProyek.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition >= sectionTop) {
        const distanceScrolled = scrollPosition - sectionTop;
        let scrollPercent = (distanceScrolled / sectionHeight) * 100;
        scrollPercent = Math.max(scrollPercent - scrollOffset, 0);
        scrollPercent = Math.min(scrollPercent, 100);
        return scrollPercent;
    }
}

function navScroll() {
    if(window.scrollY > 50) {
        nav.classList.add("drop-shadow-lg");
        nav.classList.add("text-black");
        nav.classList.remove("text-slate-100");
        nav.classList.add("bg-slate-200");
    } else {
        nav.classList.remove("bg-slate-200");
        nav.classList.remove("drop-shadow-lg");
        nav.classList.remove("text-black");
        nav.classList.add("text-slate-100");
    }
}
navScroll();

const btnNavScroll = () =>{
    if(window.scrollY > 50) {
        btnNav.classList.add("bg-slate-200");
        btnNav.classList.add("drop-shadow-lg");
        btnNav.classList.add("text-slate-900");
        btnNav.classList.remove("text-slate-100");
    } else {
        btnNav.classList.remove("bg-slate-200");
        btnNav.classList.remove("drop-shadow-lg");
        btnNav.classList.remove("text-slate-900");
        btnNav.classList.add("text-slate-100");
    }
}
window.addEventListener("scroll", () => {
    navScroll();
    let calculateScrollProyekSection = calculateScrollPercentage(sections[2], 30);
    let calculateScrollTeamSection = calculateScrollPercentage(sections[3], 30);
    document.querySelector(".scrollPageProyek").style.height = `${calculateScrollProyekSection}%`;

    if (calculateScrollProyekSection >= 100) {
        // Nilai maksimum translate Y
        const maxTranslateY = -800;
        
        // Hitung nilai translateY menggunakan interpolasi linier
        let translateYValue = maxTranslateY * (1 - (calculateScrollTeamSection / 100));
        
        // Jika pengguna berada dalam section "Team", set translateY ke 0
        if (calculateScrollTeamSection >= 5 && calculateScrollTeamSection <= 100) { 
            document.querySelector('.efekAir').style.transitionDuration = `1000ms`;
            document.querySelector('.efekAir').style.transform = `translateY(0px)`;
        } else {
            // Jika pengguna keluar dari section "Team", terapkan nilai translateY yang sesuai
            document.querySelector('.efekAir').style.transitionDuration = `300ms`;
            document.querySelector('.efekAir').style.transform = `translateY(${translateYValue}px)`;
        }
    }
});



setInterval(() => {
    let items = document.querySelectorAll(".items");
    document.querySelector("#slider").prepend(items[items.length - 1]);
}, 2000)
